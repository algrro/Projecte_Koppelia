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
  DELETE_INVOICE_FAILURE
} from '../Actions/constants'

const initialState = {
  students: [],
  studentsClassroom: [],
  classrooms: [],
  prices: [],
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
      return { ...state, students: action.payload }
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
    case DELETE_INVOICE_SUCCESS:
      console.log(action.type)
      return { ...state, currentInvoice: { name: '', total: 0, concept: '', date: '' } }
    case LIST_CLASSROOMS_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        classrooms: action.payload
      }
    case STUDENTS_CLASSROOMS_SUCCESS:
      console.log(action.type)
      return {
        ...state,
        studentsClassroom: action.payload
      }
    case SIGN_CLASSROOMS_SUCCESS:
      console.log(action.type);
      return {
        ...state,
        studentsClassroom: [
          ...state.studentsClassroom.filter(entry => entry.id_student !== action.payload.id_student),
          ...action.payload.id_enrolled.map(classId => ({
            id_student: action.payload.id_student,
            id_classroom: classId
          }))
        ]
      }
    case FETCH_PRICES_SUCCESS:
      console.log(action.type)
      return { ...state, prices: action.payload }
    case UPDATE_PRICES_SUCCESS:
      console.log(action.type)
      return { ...state, prices: action.payload }
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
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default studentReducer