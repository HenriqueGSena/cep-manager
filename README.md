
# Consulta de CEP e Gerenciamento de Endereços

Desenvolvimento de uma aplicação web que permite a consulta de **CEP** e o gerenciamento de **endereços e dados pessoais**. O usuário pode inserir um **CEP**, e a API **ViaCEP** preenche automaticamente os campos de endereço. Além disso, podendo incluir no cadastro o **Nome** e **CPF**, armazenando as informações em um **banco de dados SQL**.  

No **frontend**, foi utilizado **React** para criar uma interface intuitiva e responsiva, garantindo uma experiência fluida em diferentes dispositivos. A aplicação possui um formulário com **validação de dados**, uma listagem de endereços cadastrados e a possibilidade de edição.  

O **backend**, desenvolvido em **Java**, expõe uma **API REST** para operações **CRUD**, permitindo que os dados sejam salvos, consultados, atualizados e excluídos. Para a comunicação entre o frontend e o backend, foi deito uma integração utilizando **Axios** para realizar requisições HTTP.  

Todo o código foi versionado e publicado no **GitHub**, com uma estrutura bem organizada e documentação detalhada no `README.md` e no `SWAGGER` para analise dos endpoints. Além das funcionalidades básicas, foi implementado um recurso extra, como a exclusão de endereços e a integração do backend com a API **ViaCEP**.


## Stack utilizada

Para o desenvolvimento desta aplicação foi utilizada as seguintes stacks:

**Front-end:** React, shadCN, react-query, axios

**Back-end:** Spring Boot, java, liquibase

**Banco de Dados:** PostgreSQL


## Dependencias do Projeto

Abaixo segue as Dependencias usadas no Java/ Spring Boot e React:

Java/Spring Boot
```bash
  	<dependencies>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-data-jpa</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
		<dependency>
			<groupId>org.liquibase</groupId>
			<artifactId>liquibase-core</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-webflux</artifactId>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-docker-compose</artifactId>
			<scope>runtime</scope>
			<optional>true</optional>
		</dependency>
		<dependency>
			<groupId>org.postgresql</groupId>
			<artifactId>postgresql</artifactId>
			<scope>runtime</scope>
		</dependency>
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<version>1.18.32</version>
			<scope>provided</scope>
		</dependency>
		<dependency>
			<groupId>org.springdoc</groupId>
			<artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
			<version>2.7.0</version>
		</dependency>
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-test</artifactId>
			<scope>test</scope>
		</dependency>
	</dependencies>
```
React
```bash
"dependencies": {
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.2",
    "@tailwindcss/vite": "^4.0.17",
    "@tanstack/react-query": "^5.70.0",
    "axios": "^1.8.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.484.0",
    "tailwind-merge": "^3.0.2",
    "tailwindcss": "^4.0.17",
    "tw-animate-css": "^1.2.5"
  },
  "devDependencies": {
    "@types/node": "^22.13.14",
    "@types/react": "^18.3.20",
    "@types/react-dom": "^18.3.5",
    "@vitejs/plugin-react": "^4.3.4",
    "globals": "^15.15.0",
    "typescript": "~5.7.2",
    "vite": "^6.2.0"
  }
```


## Manual de Instalação


Baixe o projeto
```bash
  git clone https://github.com/HenriqueGSena/cep-manager.git

  cd cep-manager
```
### Instalação das dependencias

#### Java/Spring
```bash
  ./mvn clean install

  ./mvnw spring-boot:run
```
#### React
```bash
  npm install

  npm run dev
```

#### Docker
```bash
  docker-compose up
```

OBS: Para melhor usabilidade e facilidades do comando recomenda-se utilizar intellij Java e o Vscode no React;
## Documentação da API

#### Para acesso a Documentação da Api ao rodar o java/spring boot acesse:

```http
  http://localhost:8080/swagger-ui/index.html
```

