package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.dao.RoleDAO;

import java.util.HashSet;
import java.util.Set;


@Service
@Transactional
public class RoleServiceImpl implements RoleService{

    @Autowired
    private RoleDAO roleDAO;

    @Override
    public Set<Role> getAllRoles() {
        return new HashSet<>(roleDAO.findAll());
    }

    @Override
    public Role getRoleById(long id) {
        return roleDAO.findRoleById(id);
    }

    @Override
    public Role getRoleByRoleName(String roleName) {
        return roleDAO.findRoleByRoleName(roleName);
    }
}
