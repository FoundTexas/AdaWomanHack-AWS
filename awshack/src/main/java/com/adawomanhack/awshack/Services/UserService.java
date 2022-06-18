package com.adawomanhack.awshack.Services;

import com.adawomanhack.awshack.Models.User;
import com.adawomanhack.awshack.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public Iterable<User> getUsers()
    {
        return userRepository.findTable();
    }

    public User saveUser(User user) {
        userRepository.save(user);
        return user;
    }

    public User updateUser(User user) {
        userRepository.save(user);
        return user;
    }

    public User makefriendship(User user) {
        userRepository.save(user);
        return user;
    }

    public Iterable<User> getfriends(String userid) {
        return userRepository.findFriends(userid);
    }

    public User getOne(String userid){
        return userRepository.getOne(userid);
    }

    public User SignIn(String password, String userid){
        return userRepository.SignIn(password,userid);
    }
}
