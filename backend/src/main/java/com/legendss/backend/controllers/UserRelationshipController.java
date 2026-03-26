package com.legendss.backend.controllers;

import com.legendss.backend.entities.User;
import com.legendss.backend.services.UserRelationshipService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relationships")
public class UserRelationshipController {

    private final UserRelationshipService userRelationshipService;

    public UserRelationshipController(UserRelationshipService userRelationshipService) {
        this.userRelationshipService = userRelationshipService;
    }

    @PostMapping("/relative/add")
    public User addRelative(@RequestAttribute("email") String userEmail, @RequestParam String relativeEmail) {
        return userRelationshipService.addRelative(userEmail, relativeEmail);
    }

    @PostMapping("/caretaker/add")
    public User addCaretaker(@RequestAttribute("email") String userEmail, @RequestParam String caretakerEmail) {
        return userRelationshipService.addCaretaker(userEmail, caretakerEmail);
    }

    @GetMapping("/relatives")
    public List<User> getRelatives(@RequestAttribute("email") String userEmail) {
        return userRelationshipService.getRelatives(userEmail);
    }

    @GetMapping("/caretakers")
    public List<User> getCaretakers(@RequestAttribute("email") String userEmail) {
        return userRelationshipService.getCaretakers(userEmail);
    }
}
