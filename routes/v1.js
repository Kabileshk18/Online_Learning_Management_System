const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserController = require('../controllers/users.controller');
const CourseController = require('../controllers/courses.controller');
const EnrollmentController = require('../controllers/enrollments.controller');
const UserValidator = require('../validators/users.validator');
const CourseValidator = require('../validators/courses.validator');
const EnrollmentValidator = require('../validators/enrollments.validator');
const AuthMiddleware = require('../middlewares/authorize');
require('../middlewares/passport')(passport);

//general
router.post('/register', UserValidator.validateRegister, UserController.register);
router.post('/login', UserValidator.validateLogin, UserController.login);

/**
 * users - table
 */
//admin
router.get('/users/admin/getAllUser', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['admin']), UserController.getAllUser);
router.delete('/users/admin/deleteUser/:id', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['admin']), UserValidator.validatedelete, UserController.deleteUser);

/**
 * courses - table
 */
//general
router.get('/courses/getAllCourse', passport.authenticate('jwt', { session: false }), CourseController.getAllCourse);
//instructor
router.post('/courses/instructor/create', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['instructor']), CourseValidator.validateCreate, CourseController.createCourse);
router.patch('/courses/instructor/update/:id', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['instructor']), CourseValidator.validateUpdate, CourseController.updateCourse);
//admin
router.delete('/courses/admin/delete/:id', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['admin']), CourseValidator.validateDelete, CourseController.deleteCouse);

/**
 * enrollment - table
 */
//student
router.post('/enrollment/student/enroll', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['student']), EnrollmentValidator.validateEnrollment, EnrollmentController.enrollCourse);
router.get('/enrollment/student/getEnrollCourse', passport.authenticate('jwt', { session: false }), EnrollmentController.getEnrollCourse);
//instructor
router.patch('/enrollment/instructor/update', passport.authenticate('jwt', { session: false }), AuthMiddleware.authorize(['instructor']), EnrollmentValidator.validateUpdate, EnrollmentController.updateEnroll);

module.exports = router;