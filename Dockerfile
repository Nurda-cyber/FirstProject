FROM eclipse-temurin:17.0.11_9-jre-focal
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]