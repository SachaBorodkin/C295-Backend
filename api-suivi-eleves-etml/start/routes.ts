/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const StudentsController = () => import('#controllers/students_controller')
const TeachersController = () => import('#controllers/teachers_controller')
const ClassGroupsController = () => import('#controllers/class_groups_controller')
router.get('/', async () => {
  return 'API is working!'
})
router.resource('students', StudentsController).apiOnly()
router
  .group(() => {
    router.get('students', [StudentsController, 'index']) // List all
    router.get('students/:id', [StudentsController, 'show']) // Get one
    router.post('students', [StudentsController, 'store']) // Create
    router.put('students/:id', [StudentsController, 'update']) // Update
    router.delete('students/:id', [StudentsController, 'destroy']) // Delete
  })
  .prefix('/api')
router
  .group(() => {
    router.resource('teachers', TeachersController)
    router.resource('class-groups', ClassGroupsController)
  })
  .prefix('/api')
