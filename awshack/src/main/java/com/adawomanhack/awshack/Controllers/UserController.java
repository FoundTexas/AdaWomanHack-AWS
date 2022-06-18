package com.adawomanhack.awshack.Controllers;

import com.adawomanhack.awshack.Models.User;
import com.adawomanhack.awshack.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/all")
    public ResponseEntity<Iterable<User>> getAll(){

        return ResponseEntity.ok(userService.getUsers());
    }

    @PostMapping("/save")
    public ResponseEntity<User> save(@RequestBody User user) throws Exception
    {
        return ResponseEntity.ok(userService.saveUser(user));
    }

    @PostMapping("/update")
    public ResponseEntity<User> update(@RequestBody User user) throws Exception
    {
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @PostMapping("/friend")
    public ResponseEntity<User> friend(@RequestBody User user) throws Exception
    {
        return ResponseEntity.ok(userService.makefriendship(user));
    }

    @PostMapping("/findfriends")
    public ResponseEntity<Iterable<User>> getfriends(@RequestBody Map<String,String> data){

        return ResponseEntity.ok(userService.getfriends(data.get("userID")));
    }

    @PostMapping("/user")
    public ResponseEntity<User> getuser(@RequestBody Map<String,String> data){

        return ResponseEntity.ok(userService.getOne(data.get("userID")));
    }

    @PostMapping("/signin")
    public ResponseEntity<User> SignIn (@RequestBody Map<String,String> data){

        
        return ResponseEntity.ok(userService.SignIn(data.get("password"),data.get("userID")));
    }

}
