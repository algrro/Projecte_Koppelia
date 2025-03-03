import {
  FETCH_STUDENTS_SUCCESS,
  FETCH_STUDENTS_FAILURE,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_FAILURE,
  DELETE_STUDENT_SUCCESS,
  DELETE_STUDENT_FAILURE,
  EDIT_STUDENT_SUCCESS,
  EDIT_STUDENT_FAILURE,
  INVOICE_STUDENT_SUCCESS,
  INVOICE_STUDENT_FAILURE
} from '../Actions/constants'

const initialState = {
  students: [],
  studentsClassroom: [],
  currentStudent: {
    name: 'Nuevo',
    surname: '',
    matricula_paid: false,
    month_paid: false,
    picture_permission: false,
    family_disc: false,
    birth_date: '',
    email: '',
    phone: '',
    tutor: '',
    contacto_tutor: ''
  },
  error: null,
  currentInvoice: {
    name: '',
    total: 0,
    concept: '',
    date: ''
  }
}

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      console.log(action.type)
      const { students, st_class } = action.payload
      const studentClassroomIds = new Set(st_class.map(s => s.id_student))
      return { ...state, students: students, studentsClassroom: Array.from(studentClassroomIds) }
    case CREATE_STUDENT_SUCCESS:
      console.log(action.type)
      return { ...state, students: [...state.students, action.payload] }
    case EDIT_STUDENT_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        students: state.students.map(student => student.id_student === action.payload.id_student ? action.payload : student)
      }
    case DELETE_STUDENT_SUCCESS:
      console.log(action.type)
      return { ...state, students: [...state.students.filter((item) => item.id_student !== action.payload)] }
    case INVOICE_STUDENT_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        currentInvoice: { ...action.payload }
      }
    case FETCH_STUDENTS_FAILURE:
    case CREATE_STUDENT_FAILURE:
    case DELETE_STUDENT_FAILURE:
    case EDIT_STUDENT_FAILURE:
    case INVOICE_STUDENT_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default studentReducer