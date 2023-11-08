FROM openjdk:8-jdk-alpine
EXPOSE 5000
ARG JAR_FILE=target/proyecto-oci-backend-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]