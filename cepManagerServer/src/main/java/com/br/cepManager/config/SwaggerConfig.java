package com.br.cepManager.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI defaultOpenAPI() {
        Server server = new Server();
        server.setUrl("http://localhost:8080");
        server.setDescription("Gerenciador de endereços baseado em CEP");

        Contact contact = new Contact();
        contact.setName("\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDCBB Henrique Sena");
        contact.setUrl("https://henriquesenadev.vercel.app/");

        Info info = new Info()
                .title("Consulta de CEP e Gerenciamento de Endereços")
                .description("Desenvolvimento de uma aplicação web para consulta de CEP e gerenciamento de endereços e dados pessoais. O usuário poderá inserir seu CEP, e a API ViaCEP preencherá automaticamente os campos de endereço. Além disso, o usuário deverá cadastrar Nome e CPF, armazenando as informações em um banco de dados SQL.")
                .version("0.0.1")
                .contact(contact);
        return  new OpenAPI().info(info).servers(List.of(server));
    }
}
