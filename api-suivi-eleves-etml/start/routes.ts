import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const UsersController = () => import('#controllers/users_controller')
const StudentsController = () => import('#controllers/students_controller')
const CommentsController = () => import('#controllers/comments_controller')

router.post('register', [UsersController, 'register'])
router.post('login', [UsersController, 'login'])

router
  .group(() => {
    router.resource('students', StudentsController).apiOnly()

    // Nested routes for comments belonging to students
    router.get('students/:student_id/comments', [CommentsController, 'index'])
    router.post('students/:student_id/comments', [CommentsController, 'store'])
    router.put('students/:student_id/comments/:id', [CommentsController, 'update'])
    router.delete('students/:student_id/comments/:id', [CommentsController, 'destroy'])

    router.post('logout', [UsersController, 'logout'])
  })
  .use(middleware.auth())
