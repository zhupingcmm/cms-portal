FROM openjdk:8-jdk-alpine
WORKDIR /ROOT
COPY ./target/cms-portal-0.0.1.jar /ROOT/app.jar
EXPOSE 8091
CMD ["java","-jar","app.jar"]