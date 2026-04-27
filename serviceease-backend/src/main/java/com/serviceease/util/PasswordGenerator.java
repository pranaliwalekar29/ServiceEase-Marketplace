package com.serviceease.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordGenerator {
    private static final Logger logger = LoggerFactory.getLogger(PasswordGenerator.class);

    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encoded = encoder.encode("admin123");
        logger.info("Generated password hash: {}", encoded);
    }
}
