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

        System.out.println(userService.getUsers().iterator().next());
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




}
