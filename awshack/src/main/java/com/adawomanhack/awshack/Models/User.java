package com.adawomanhack.awshack.Models;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.*;

import java.util.Set;

@DynamoDbBean
public class User {
    private String userID;
    private String friendID;
    private String last_update;
    private String password;
    private String username;
    private String phone;
    private String name;
    private Integer risk;
    private Set<String> initial_position;
    private Set<String> final_position;
    private Set<String> risk_position;
    private Boolean traveling;

    


    @DynamoDbPartitionKey
    @DynamoDbAttribute("userID")
    @DynamoDbSecondarySortKey(indexNames = {"Friend"})
    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    @DynamoDbSortKey
    @DynamoDbAttribute("friendID")
    @DynamoDbSecondaryPartitionKey(indexNames = {"Friend"})
    public String getFriendID() {
        return friendID;
    }

    public void setFriendID(String friendID) {
        this.friendID = friendID;
    }

    public String getLast_update() {
        return last_update;
    }

    public void setLast_update(String last_update) {
        this.last_update = last_update;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Integer getRisk() {
        return risk;
    }

    public void setRisk(Integer risk) {
        this.risk = risk;
    }

    public Set<String> getInitial_position() {
        return initial_position;
    }

    public void setInitial_position(Set<String> initial_position) {
        this.initial_position = initial_position;
    }

    public Set<String> getFinal_position() {
        return final_position;
    }

    public void setFinal_position(Set<String> final_position) {
        this.final_position = final_position;
    }

    public Set<String> getRisk_position() {
        return risk_position;
    }

    public void setRisk_position(Set<String> risk_position) {
        this.risk_position = risk_position;
    }

    public Boolean getTraveling() {
        return traveling;
    }

    public void setTraveling(Boolean traveling) {
        this.traveling = traveling;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}