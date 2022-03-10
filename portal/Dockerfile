FROM openjdk:8-jdk-alpine
WORKDIR /opt
COPY ./target/cms-portal-0.0.1.jar /opt/app.jar
EXPOSE 8091
CMD ["java","-jar","app.jar"]