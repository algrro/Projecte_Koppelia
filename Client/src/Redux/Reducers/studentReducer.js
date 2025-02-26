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
  loading: false,
  error: null,
}

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STUDENTS_SUCCESS:
      console.log(action.type)
      //console.log({ ...state, students: action.payload, loading: false })
      return { ...state, students: action.payload, loading: false }
    case CREATE_STUDENT_SUCCESS:
      console.log(action.type)
      //console.log({ ...state, students: [...state.students, action.payload], loading: false })
      return { ...state, students: [...state.students, action.payload], loading: false }
    case EDIT_STUDENT_SUCCESS:
      console.log(action.type)
      // console.log({
      //   ...state,
      //   students: state.students.map(student => student.id_student === action.payload.id_student ? action.payload : student),
      //   loading: false
      // })
      return {
        ...state,
        students: state.students.map(student => student.id_student === action.payload.id_student ? action.payload : student),
        loading: false
      }
    case DELETE_STUDENT_SUCCESS:
      console.log(action.type)
      //console.log({ ...state, students: [...state.students.filter((item) => item.id_student !== action.payload)], loading: false })
      return { ...state, students: [...state.students.filter((item) => item.id_student !== action.payload)], loading: false }
    case FETCH_STUDENTS_FAILURE:
    case CREATE_STUDENT_FAILURE:
    case DELETE_STUDENT_FAILURE:
    case EDIT_STUDENT_FAILURE:
    case INVOICE_STUDENT_FAILURE:
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export default studentReducer