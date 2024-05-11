package com.example.tlsstock.validator;

import com.example.tlsstock.dtos.CategoryDto;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class CategoryValidator {

    public static List<String> validate(CategoryDto categoryDto){
        List<String> errors = new ArrayList<>();

        if(categoryDto == null || !StringUtils.hasLength(categoryDto.getName())){
            errors.add("Veuillez Renseigner Le Nom De la Categorie !");
        }
        return errors;
    }
}
