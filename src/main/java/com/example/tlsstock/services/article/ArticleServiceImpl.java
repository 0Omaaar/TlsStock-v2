package com.example.tlsstock.services.article;

import com.example.tlsstock.dtos.ArticleColorDto;
import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.ArticleColor;
import com.example.tlsstock.entities.Category;
import com.example.tlsstock.entities.SousCategory;
import com.example.tlsstock.repositories.ArticleColorRepository;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.CategoryRepository;
import com.example.tlsstock.repositories.SousCategoryRepository;
import com.example.tlsstock.services.QRCode.QRCodeGeneratorService;
import com.google.zxing.WriterException;
import org.hibernate.dialect.function.SybaseTruncFunction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private SousCategoryRepository sousCategoryRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private QRCodeGeneratorService qrCodeGeneratorService;

    @Autowired
    private ArticleColorRepository articleColorRepository;

    @Override @Transactional
    public ArticleDto saveArticle(ArticleDto articleDto) throws IOException, WriterException {
        System.out.println(articleDto);
        if(articleDto != null){
            Article article = new Article();
            article.setCode(articleDto.getCode());
            article.setName(articleDto.getName());
            article.setDescription(articleDto.getDescription());
            article.setQuantity(articleDto.getQuantity());
            article.setDispoQuantity(articleDto.getQuantity());
            article.setMinQuantity(articleDto.getMinQuantity());
            if(articleDto.getImage() != null){
                article.setImage(articleDto.getImage().getBytes());
            }

            SousCategory sousCategory = sousCategoryRepository.findById(articleDto.getSousCategoryId()).orElse(null);
            article.setSousCategory(sousCategory);

            Category category = categoryRepository.findById(articleDto.getCategoryId()).orElse(null);
            article.setCategory(category);

            // Generate QR code image
            Article newArticle = generateAndSetQRCode(article);

            Article savedArticle =  articleRepository.save(newArticle);

            if(articleDto.getArticleColors() != null){
                for(ArticleColorDto articleColorDto: articleDto.getArticleColors()){
                    ArticleColor articleColor = new ArticleColor();
                    articleColor.setArticle(savedArticle);
                    articleColor.setQuantity(articleColorDto.getQuantity());
                    articleColor.setDispoQuantity(articleColorDto.getQuantity());
                    articleColor.setColor(articleColorDto.getColor());
                    articleColor.setImage(articleColorDto.getImage().getBytes());

                    articleColorRepository.save(articleColor);
                }
            }
            return savedArticle.getDto();
        }
        return null;
    }

    @Override
    public ArticleDto updateArticle(ArticleDto articleDto) throws IOException, WriterException {
        System.out.println(articleDto);
        Article article = articleRepository.findById(articleDto.getId()).orElse(null);
        if(article != null){
            article.setName(articleDto.getName());
            article.setCode(articleDto.getCode());
            article.setDescription(articleDto.getDescription());
            article.setQuantity(articleDto.getQuantity());

            if(articleDto.getImage() != null){
                article.setImage(articleDto.getImage().getBytes());
            }



            if(articleDto.getArticleColors() != null){
                for(ArticleColorDto articleColorDto: articleDto.getArticleColors()){

                   System.out.println(articleColorDto);
                   if(articleColorDto.getColor() != null && articleColorDto.getQuantity() != null && articleColorDto.getImage() != null){
                       ArticleColor newArticleColor = new ArticleColor();
                       newArticleColor.setArticle(article);
                       newArticleColor.setQuantity(articleColorDto.getQuantity());
                       newArticleColor.setDispoQuantity(articleColorDto.getQuantity());
                       newArticleColor.setColor(articleColorDto.getColor());
                       newArticleColor.setImage(articleColorDto.getImage().getBytes());

                       articleColorRepository.save(newArticleColor);
                   }

                }
            }


            Article updateArticle = articleRepository.save(article);

            Article newArticle = generateAndSetQRCode(updateArticle);

            return newArticle.getDto();
        }
        return null;
    }

    @Override
    public List<ArticleDto> getArticles() {
        List<ArticleDto> articleDtos = articleRepository.findAll().stream().map(Article::getDto).collect(Collectors.toList());
        return articleDtos;
    }



    @Override
    public List<ArticleDto> searchArticlesByKeyword(String keyword) {
        List<ArticleDto> articleDtos = articleRepository.findByCodeContainingOrNameContaining(keyword).stream()
                .map(Article::getDto).collect(Collectors.toList());
        if(articleDtos != null){
            return articleDtos;
        }
        return null;
    }

    @Override
    public ArticleDto getArticle(Long id) {
        ArticleDto articleDto = articleRepository.findById(id).get().getDto();
        if(articleDto != null){
            return articleDto;
        }
        return null;
    }

    @Override
    public boolean deleteArticle(ArticleDto articleDto) {
        Article article = articleRepository.findById(articleDto.getId()).orElse(null);
        if(article != null){
            articleRepository.deleteById(articleDto.getId());
            return true;
        }
        return false;
    }

    @Override
    public void save(MultipartFile file) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {
            System.out.println("here");
            List<Article> articles = new ArrayList<>();
            String line;
            boolean isFirstLine = true; // To handle header

            while ((line = reader.readLine()) != null) {
                if (isFirstLine) {
                    isFirstLine = false;
                    continue;
                }

                String[] data = line.split(",");
//                if (data.length < 7) {
//                    // Log or handle the case where the line doesn't have enough data
//                    System.err.println("Invalid line: " + line);
//                    continue;
//                }

                try {
                    System.out.println("here 2");
                    Article article = new Article();
                    article.setCode(data[0]);
                    article.setDescription(data[1]);
                    article.setDispoQuantity(Long.parseLong(data[2]));
                    article.setMinQuantity(Long.parseLong(data[4])); // Assuming this is index 4
                    article.setName(data[5]);
                    article.setQuantity(Long.parseLong(data[6]));

                    Category category = categoryRepository.findById(Long.parseLong(data[7])).orElse(null);
                    SousCategory sousCategory = sousCategoryRepository.findById(Long.parseLong(data[8])).orElse(null);

                    if(category != null && sousCategory != null){
                        article.setSousCategory(sousCategory);
                    }
                    articles.add(article);
                } catch (NumberFormatException e) {
                    System.err.println("Error parsing number in line: " + line);
                    e.printStackTrace();
                }
            }

            articleRepository.saveAll(articles);
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Error reading CSV file", e);
        }
    }

    private Article generateAndSetQRCode(Article article) throws IOException, WriterException {
        String qrCodeText = "Code Article: " + article.getCode() + ", Nom: " + article.getName() +
                ", Quantité Initiale: " + article.getQuantity() + ", Quantité Disponible: " + article.getDispoQuantity();
            byte[] qrCodeImage = qrCodeGeneratorService.generateQRCodeImage(qrCodeText, 200, 200);
            article.setQrCodeText(qrCodeText);

        article.setQrCodeImage(qrCodeImage);
        return articleRepository.save(article);
    }
}
