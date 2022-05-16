package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/users")
public class UserRestController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;


    @GetMapping()
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }



    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") long id) {
        return userService.getUserById(id);
    }

    @PostMapping()
    public User addUser(@RequestBody User user, @RequestParam(value = "inputRoles", required = false) Long[] inputRoles){
        Set<Role> temp = new HashSet<>();
        if (inputRoles == null) {
            temp.add(roleService.getRoleByRoleName("ROLE_USER"));
            user.setRoleSet(temp);
        } else {
            for(Long i: inputRoles) {
                temp.add(roleService.getRoleById(i));
            }
            user.setRoleSet(temp);
        }
        userService.addUser(user);
        return userService.getUserByEmail(user.getUsername());
    }


    @GetMapping("/auth")
    public User getAuthUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getUserByEmail(userDetails.getUsername());
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") long id) {
        userService.removeUserById(id);
    }
}
