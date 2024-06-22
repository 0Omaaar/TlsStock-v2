package com.example.tlsstock.services.stock_movement;

import com.example.tlsstock.dtos.StockMovementDto;
import com.example.tlsstock.entities.StockMovement;
import com.example.tlsstock.enums.TypeMvtStk;
import com.example.tlsstock.repositories.StockMovementRepository;
import com.example.tlsstock.services.stockPrediction.StockPredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import weka.classifiers.functions.LinearRegression;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;

import java.util.ArrayList;
import java.util.List;

@Service
public class StockPredictionServiceImpl implements StockPredictionService {

    @Autowired
    private StockMovementRepository stockMovementRepository;

    @Override
    public double predictRecommendedQuantityByArithmeticAverage(Long articleId) {
        List<StockMovement> stockMovements = stockMovementRepository.findAllByArticleId(articleId);
        if(stockMovements != null){
            List<StockMovementDto> stockMovementDtos = stockMovements.stream().map(StockMovement::getDto).toList();
            int n = stockMovements.size();
            double sum = 0.0;
            for(StockMovementDto movement : stockMovementDtos){
                if(movement.getTypeMvt().equals(TypeMvtStk.SORTIE)){
                    sum -= movement.getQuantity();
                }else if(movement.getTypeMvt().equals(TypeMvtStk.ENTREE)){
                    sum += movement.getQuantity();
                }
            }
            double prediction = sum/n;
            return Math.max(prediction, 1);
        }
        return 0;
    }

    @Override
    public double predictRecommendedQuantityByTrainedModel(Long articleId) {
        List<StockMovement> stockMovements = stockMovementRepository.findAllByArticleId(articleId);
        if(stockMovements != null){
            List<StockMovementDto> stockMovementDtos = stockMovements.stream().map(StockMovement::getDto).toList();
            try {
                Instances data = createDataset(stockMovementDtos);
                LinearRegression model = trainModel(data);

                DenseInstance newInstance = new DenseInstance(data.numAttributes());
                newInstance.setDataset(data);
                newInstance.setValue(0, stockMovementDtos.size());
                double prediction = model.classifyInstance(newInstance);

                System.out.println(Math.max(prediction, 0));
                return Math.max(prediction, 0);
            } catch (Exception e) {
                e.printStackTrace();
                return 0;
            }
        }
        return 0;
    }


    private Instances createDataset(List<StockMovementDto> stockMovementDtos) {
        ArrayList<Attribute> attributes = new ArrayList<>();
        attributes.add(new weka.core.Attribute("movement_count"));

        Instances data = new Instances("StockMovements", attributes, stockMovementDtos.size());
        data.setClassIndex(data.numAttributes() - 1);

        for (StockMovementDto dto : stockMovementDtos) {
            DenseInstance instance = new DenseInstance(data.numAttributes());
            instance.setValue(0, dto.getQuantity());
            data.add(instance);
        }

        return data;
    }

    private LinearRegression trainModel(Instances data) throws Exception {
        LinearRegression model = new LinearRegression();
        model.buildClassifier(data);
        return model;
    }

}
