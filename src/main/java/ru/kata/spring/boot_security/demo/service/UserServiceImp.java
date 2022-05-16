package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.dao.UserDAO;

import java.util.List;

@Service
@Transactional
public class UserServiceImp implements UserService, UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Autowired
    private  PasswordEncoder passwordEncoder;



    @Override
    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDAO.save(user);
    }


    @Override
    public void removeUserById(long id) {
        userDAO.deleteById(id);
    }


    @Override
    public List<User> getAllUsers() {
        return userDAO.findAll();
    }


    @Override
    public void updateUser(User user) {
        if(user.getPassword() == "") {
            user.setPassword(getUserById(user.getId()).getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        userDAO.save(user);
    }


    @Override
    public User getUserById(long id) {
        return userDAO.findById(id).get();
    }


    @Override
    public User getUserByEmail(String username) {
        return userDAO.findUserByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = userDAO.findUserByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }
}

