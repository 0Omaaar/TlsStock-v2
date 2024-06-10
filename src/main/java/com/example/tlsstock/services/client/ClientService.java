package com.example.tlsstock.services.client;

import com.example.tlsstock.dtos.ClientDto;
import com.example.tlsstock.dtos.OrderClientDto;

import java.util.List;

public interface ClientService {

    ClientDto saveClient(ClientDto clientDto);

    List<ClientDto> getClients();

    List<OrderClientDto> getOrdersByClient(Long clientId);

    ClientDto updateClient(ClientDto clientDto);

    boolean deleteClient(ClientDto clientDto);
}
