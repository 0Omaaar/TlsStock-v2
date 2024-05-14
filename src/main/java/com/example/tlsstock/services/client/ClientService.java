package com.example.tlsstock.services.client;

import com.example.tlsstock.dtos.ClientDto;

import java.util.List;

public interface ClientService {

    ClientDto saveClient(ClientDto clientDto);

    List<ClientDto> getClients();

    ClientDto updateClient(ClientDto clientDto);

    boolean deleteClient(ClientDto clientDto);
}
