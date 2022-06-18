package com.adawomanhack.awshack.Repositories;

import com.adawomanhack.awshack.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbEnhancedClient;
import software.amazon.awssdk.enhanced.dynamodb.DynamoDbTable;
import software.amazon.awssdk.enhanced.dynamodb.Key;
import software.amazon.awssdk.enhanced.dynamodb.TableSchema;
import software.amazon.awssdk.enhanced.dynamodb.model.QueryConditional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    public User getOne(String userid){
        DynamoDbTable<User> userTable = getTable();
        Key key = Key.builder().partitionValue(userid).sortValue(userid).build();
        User newUser = userTable.getItem(r->r.key(key));

        return newUser;
    }

    public Iterable<User> findFriends(final String userid) {
        DynamoDbTable<User> userTable = getTable();


        QueryConditional queryConditional = QueryConditional
                .keyEqualTo(Key.builder().partitionValue(userid)
                        .build());

        Iterable<User> table = userTable.query(r -> r.queryConditional(queryConditional)).items();

        List<User> result = new ArrayList<>();


        for(User useriterable: table)
        {
            result.add(useriterable);
        }

        result.remove(0);

        Iterable<User> list = result;
        return list;
    }

    public Boolean SignIn (String password, String userid){
        User user = getOne(userid);

        if (Objects.equals(user.getPassword(), password)){
            return Boolean.TRUE;
        }
        else return Boolean.FALSE;
    }

}
