# cliente-api

  API para gerenciar os dados de Clientes. É possível fazer a inclusão, alteração, consulta, listagem e exclusão de clientes.
  Neste projeto mostraremos como armazenar arquivos no MySQL.



1. Java
1. Maven
1. IDE Intellij ou Eclipse
1. MySQL
1. Postman

## Configurar banco de dados MySQL


 precisará criar um banco de dados com o nome `clientedb`. Atualize o usuário e senha no arquivo `application.properties` para os dados do seu banco de dados

    spring.datasource.username=root
    spring.datasource.password=123456


## Iniciar a aplicação

 utilizando o maven

    mvn spring-boot:run
