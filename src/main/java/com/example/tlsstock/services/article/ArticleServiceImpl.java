package com.example.tlsstock.services.article;

import com.example.tlsstock.dtos.ArticleDto;
import com.example.tlsstock.entities.Article;
import com.example.tlsstock.entities.Category;
import com.example.tlsstock.repositories.ArticleRepository;
import com.example.tlsstock.repositories.CategoryRepository;
import com.example.tlsstock.services.QRCode.QRCodeGeneratorService;
import com.google.zxing.WriterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServiceImpl implements ArticleService{

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private QRCodeGeneratorService qrCodeGeneratorService;

    @Override
    public ArticleDto saveArticle(ArticleDto articleDto) throws IOException, WriterException {
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

            Category category = categoryRepository.findById(articleDto.getCategoryId()).orElse(null);
            article.setCategory(category);

            // Generate QR code image
            Article newArticle = generateAndSetQRCode(article);

            return articleRepository.save(newArticle).getDto();
        }
        return null;
    }

    @Override
    public ArticleDto updateArticle(ArticleDto articleDto) throws IOException, WriterException {
        Article article = articleRepository.findById(articleDto.getId()).orElse(null);
        if(article != null){
            article.setName(articleDto.getName());
            article.setCode(articleDto.getCode());
            article.setDescription(articleDto.getDescription());
            article.setQuantity(articleDto.getQuantity());

            Category category = categoryRepository.findById(articleDto.getCategoryId()).orElse(null);
            if(articleDto.getImage() != null){
                article.setImage(articleDto.getImage().getBytes());
            }
            if(category != null){
                article.setCategory(category);
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

    private Article generateAndSetQRCode(Article article) throws IOException, WriterException {
        String qrCodeText = "Code Article: " + article.getCode() + ", Nom: " + article.getName() +
                ", Quantité Initiale: " + article.getQuantity() + ", Quantité Disponible: " + article.getDispoQuantity();
        // Check if QR code already exists
//        if (article.getQrCodeImage() == null) {
            // Generate QR code image for the first time
            byte[] qrCodeImage = qrCodeGeneratorService.generateQRCodeImage(qrCodeText, 200, 200);
            article.setQrCodeText(qrCodeText);

        article.setQrCodeImage(qrCodeImage);
//        } else {
            // Update QR code text without changing the image
//            article.setQrCodeText(qrCodeText);
//        }

        return articleRepository.save(article);
    }
}
