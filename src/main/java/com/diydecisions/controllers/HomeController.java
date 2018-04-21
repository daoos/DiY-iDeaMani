package com.diydecisions.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

	private final Logger logger = LoggerFactory.getLogger(this.getClass());  
    @RequestMapping("/home")
    public String index() {
    	logger.debug("HomeController-->index() STARTED DEBUG");
    	logger.info("HomeController-->index() STARTED INFO");
    	logger.error("HomeController-->index() STARTED ERROR");
    	logger.warn("HomeController-->index() STARTED WARN");
        return "Greetings from Spring Boot!";
    }

}