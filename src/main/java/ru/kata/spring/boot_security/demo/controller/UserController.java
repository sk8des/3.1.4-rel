package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.util.HashSet;
import java.util.Set;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;

    @GetMapping("/")
    public String startPage() {
        return "redirect:/admin";
    }

    @GetMapping("/admin")
    public String getUsers(@AuthenticationPrincipal UserDetails userDetails, @ModelAttribute("user") User user,Model model) {
        model.addAttribute("authUserInfo", userService.getUserByEmail(userDetails.getUsername()));
        model.addAttribute("usersInfo", userService.getAllUsers());
        model.addAttribute("roles", roleService.getAllRoles());
        model.addAttribute("roleAdmin", roleService.getRoleByRoleName("ROLE_ADMIN"));
        return "admin";
    }

    @GetMapping("/user")
    public String userGetPage(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        model.addAttribute("authUserInfo", userService.getUserByEmail(userDetails.getUsername()));
        model.addAttribute("roleAdmin", roleService.getRoleByRoleName("ROLE_ADMIN"));
        return "user";
    }

    @PostMapping("/admin")
    public String createUser(@ModelAttribute("user") User user, @RequestParam(value = "inputRoles", required = false) Long[] inputRoles) {
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
        return "redirect:/admin";
    }

    @PatchMapping("/admin/{id}")
    public String updateUser(@ModelAttribute("user") User user,
                             @PathVariable("id") long id,
                             @RequestParam(value = "inputRoles", required = false) Long[] inputRoles) {
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
        userService.updateUser(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin/{id}")
    public String removeUser(@PathVariable("id") long id) {
        userService.removeUserById(id);
        return "redirect:/admin";
    }

}
