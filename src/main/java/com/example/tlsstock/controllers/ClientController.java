package com.example.tlsstock.controllers;

import com.example.tlsstock.dtos.ClientDto;
import com.example.tlsstock.dtos.OrderClientDto;
import com.example.tlsstock.services.client.ClientService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/api/")
public class ClientController {

    @Autowired
    private ClientService clientService;

    @GetMapping("clients")
    public ResponseEntity<?> getClients(){
        List<ClientDto> clientDtos = clientService.getClients();
        if(clientDtos != null){
            return ResponseEntity.ok(clientDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("client/{id}/orders")
    public ResponseEntity<?> getClientOrders(@PathVariable Long id){
        List<OrderClientDto> orderClientDtos = clientService.getOrdersByClient(id);
        if(orderClientDtos != null){
            return ResponseEntity.ok(orderClientDtos);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("client/save")
    public ResponseEntity<?> addClient(@RequestBody ClientDto clientDto){
        ClientDto savedClient = clientService.saveClient(clientDto);
        if(savedClient != null){
            return ResponseEntity.ok(savedClient);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @PutMapping("client/update")
    public ResponseEntity<?> updateClient(@RequestBody ClientDto clientDto){
        ClientDto updatedClient = clientService.updateClient(clientDto);
        if(updatedClient != null){
            return ResponseEntity.ok(updatedClient);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @DeleteMapping("client/delete")
    public boolean deleteClient(@RequestBody ClientDto clientDto){
        return clientService.deleteClient(clientDto);
    }
}
