package com.example.tlsstock.services.client;

import com.example.tlsstock.dtos.ClientDto;
import com.example.tlsstock.entities.Client;
import com.example.tlsstock.repositories.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientServiceImpl implements ClientService{

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public ClientDto saveClient(ClientDto clientDto) {
        if(clientDto != null){
            Client client = new Client();
            client.setName(clientDto.getName());
            client.setPhone(clientDto.getPhone());
            client.setEmail(clientDto.getEmail());
            ClientDto savedClient = clientRepository.save(client).getDto();
            return savedClient;
        }
        return null;
    }

    @Override
    public List<ClientDto> getClients() {
        List<ClientDto> clientDtos = clientRepository.findAll().stream()
                .map(Client::getDto).collect(Collectors.toList());
        if(clientDtos != null){
            return clientDtos;
        }
        return null;
    }

    @Override
    public ClientDto updateClient(ClientDto clientDto) {
        if(clientDto != null){
            Client findedClient = clientRepository.findById(clientDto.getId()).orElse(null);
            if(findedClient != null){
                findedClient.setEmail(clientDto.getEmail());
                findedClient.setName(clientDto.getName());
                findedClient.setPhone(clientDto.getPhone());

                return clientRepository.save(findedClient).getDto();
            }
        }
        return null;
    }

    @Override
    public boolean deleteClient(ClientDto clientDto) {
        Client client = clientRepository.findById(clientDto.getId()).orElse(null);
        if(client != null){
            clientRepository.delete(client);
            return true;
        }
        return false;
    }
}
