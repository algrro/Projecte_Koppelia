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
  INVOICE_STUDENT_FAILURE,
  LIST_CLASSROOMS_SUCCESS,
  LIST_CLASSROOMS_FAILURE,
  STUDENTS_CLASSROOMS_SUCCESS,
  STUDENTS_CLASSROOMS_FAILURE,
  SIGN_CLASSROOMS_SUCCESS,
  SIGN_CLASSROOMS_FAILURE,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_FAILURE,
  UPDATE_PRICES_SUCCESS,
  UPDATE_PRICES_FAILURE,
  DELETE_INVOICE_SUCCESS,
  DELETE_INVOICE_FAILURE,
  FETCH_TEACHERS_SUCCESS,
  FETCH_TEACHERS_FAILURE,
  UPDATE_TEACHERS_SUCCESS,
  UPDATE_TEACHERS_FAILURE,
  UPDATE_CLASSROOMS_SUCCESS,
  UPDATE_CLASSROOMS_FAILURE
} from '../Actions/constants'

const initialState = {
  students: [],
  studentsClassroom: [],
  classrooms: [],
  prices: [],
  teachers: [],
  currentStudent: {
    name: '',
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
      return { ...state, students: action.payload }
    case CREATE_STUDENT_SUCCESS:
      return { ...state, students: [...state.globals, action.payload] }
    case EDIT_STUDENT_SUCCESS:
      return {
        ...state,
        students: state.globals.map(student => student.id_student === action.payload.id_student ? action.payload : student)
      }
    case DELETE_STUDENT_SUCCESS:
      return { ...state, students: [...state.globals.filter((item) => item.id_student !== action.payload)] }
    case INVOICE_STUDENT_SUCCESS:
      return {
        ...state,
        currentInvoice: { ...action.payload }
      }
    case DELETE_INVOICE_SUCCESS:
      return { ...state, currentInvoice: { name: '', total: 0, concept: '', date: '' } }
    case LIST_CLASSROOMS_SUCCESS:
      return {
        ...state,
        classrooms: action.payload
      }
    case STUDENTS_CLASSROOMS_SUCCESS:
      return {
        ...state,
        studentsClassroom: action.payload
      }
    case SIGN_CLASSROOMS_SUCCESS:
      return {
        ...state,
        studentsClassroom: [
          ...state.globalsClassroom.filter(entry => entry.id_student !== action.payload.id_student),
          ...action.payload.id_enrolled.map(classId => ({
            id_student: action.payload.id_student,
            id_classroom: classId
          }))
        ]
      }
    case FETCH_PRICES_SUCCESS:
      return { ...state, prices: action.payload }
    case UPDATE_PRICES_SUCCESS:
      return { ...state, prices: action.payload }
    case FETCH_TEACHERS_SUCCESS:
      return { ...state, teachers: action.payload }
    case UPDATE_TEACHERS_SUCCESS:
      return { ...state, teachers: action.payload }
    case UPDATE_CLASSROOMS_SUCCESS:
      return { ...state, classrooms: action.payload }
    case FETCH_STUDENTS_FAILURE:
    case CREATE_STUDENT_FAILURE:
    case DELETE_STUDENT_FAILURE:
    case EDIT_STUDENT_FAILURE:
    case INVOICE_STUDENT_FAILURE:
    case LIST_CLASSROOMS_FAILURE:
    case STUDENTS_CLASSROOMS_FAILURE:
    case SIGN_CLASSROOMS_FAILURE:
    case FETCH_PRICES_FAILURE:
    case UPDATE_PRICES_FAILURE:
    case DELETE_INVOICE_FAILURE:
    case FETCH_TEACHERS_FAILURE:
    case UPDATE_TEACHERS_FAILURE:
    case UPDATE_CLASSROOMS_FAILURE:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default studentReducer