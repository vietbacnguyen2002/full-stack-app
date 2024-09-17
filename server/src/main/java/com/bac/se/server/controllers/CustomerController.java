package com.bac.se.server.controllers;

import com.bac.se.server.models.Customer;
import com.bac.se.server.repositories.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/customers")
@CrossOrigin
public class CustomerController {
    private final CustomerRepository customerRepository;

    @GetMapping
    public List<Customer> getCustomer(){
        return customerRepository.findAll();
    }
    @PostMapping
    public void addCustomer(@RequestBody Customer customer){
        customerRepository.save(customer);
    }

}
