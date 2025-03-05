const SUCCESS = {};

SUCCESS.CREATE_USER = 'User have been created successfully !!!';
SUCCESS.USER_LOGIN = 'User have successfully logged in !!!';
SUCCESS.USER_DELETED = 'User have successfully deleted !!!';
SUCCESS.CREATE_COURSE = 'Course have been created successfully !!!';
SUCCESS.UPDATE_COURSE = 'Course have been updated successfully !!!';
SUCCESS.DELETE_COURSE = 'Course have been deleted successfully !!!';
SUCCESS.ENROLLED_COURSE = 'Course have been enrolled successfully !!!';
SUCCESS.UPDATE_ENROLL = 'Enroll have been updated successfully !!!';


const ERROR = {};

ERROR.CREATE_USER = 'Failed to create an user ...';
ERROR.USER_FOUND = 'User found ...';
ERROR.INVALID_PASS = 'Invalid password ...';
ERROR.NO_USER = 'No such user found ...';
ERROR.NO_COURSE = 'No course found ...';
ERROR.OWN_INSTRUCTOR = 'Own instructor can update ...';

module.exports = { SUCCESS, ERROR }