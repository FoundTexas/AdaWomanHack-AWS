package com.adawomanhack.awshack.Repositories;

import com.adawomanhack.awshack.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;

@Repository
public class UserRepository {

    @Autowired
    private DynamoDbEnhancedClient dynamoDbEnhancedClient;

    public UserRepository() {super();}

    private DynamoDbTable<User> getTable()
    {
        DynamoDbTable<User> callTable = dynamoDbEnhancedClient.table("Users", TableSchema.fromBean(User.class));
        return callTable;
    }

    public Iterable<User> findTable()
    {
        DynamoDbTable<User> callTable = getTable();
        return callTable.scan().items();
    }

    public void save(final User user)
    {
        DynamoDbTable<User> userTable = getTable();
        userTable.putItem(user);
    }

    public User update(User user){
        DynamoDbTable<User> userTable = getTable();
        Key key = Key.builder().partitionValue(user.getUserID()).sortValue(user.getUserID()).build();
        User newUser = userTable.getItem(r->r.key(key));

        userTable.updateItem(newUser);
        return newUser;
    }



}
