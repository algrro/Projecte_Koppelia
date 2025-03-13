import axios from 'axios'
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
} from './constants'

export const fetchStudents = () => async (dispatch) => {
  console.log("...ejecutando...fetchStudents()")
  try {
    const response = await axios.get('http://localhost:9999/api/student')
    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_STUDENTS_FAILURE,
      payload: error.message
    })
  }
}

export const addStudent = (studentData) => async (dispatch) => {
  console.log("...ejecutando...addStudent(data)")
  try {
    const response = await axios.post('http://localhost:9999/api/student/add_student', { ...studentData, birth_date: new Date(studentData.birth_date) })
    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: CREATE_STUDENT_FAILURE,
      payload: error.message
    })
  }
}

export const editStudent = (studentEdited) => async (dispatch) => {
  console.log("...ejecutando...editStudent(data)")
  try {
    const response = await axios.post(`http://localhost:9999/api/student/edit_student/${studentEdited.id_student}`, { ...studentEdited, birth_date: new Date(studentEdited.birth_date) })
    dispatch({
      type: EDIT_STUDENT_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: EDIT_STUDENT_FAILURE,
      payload: error.message
    })
  }
}

export const deleteStudent = (id_student) => async (dispatch) => {
  console.log("...ejecutando...deleteStudent(id_student)")
  try {
    const response = await axios.delete(`http://localhost:9999/api/student/${id_student}`)
    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: DELETE_STUDENT_FAILURE,
      payload: error.message
    })
  }
}

export const addInvoice = (idStudent) => async (dispatch) => {
  console.log("...ejecutando...addInvoice()")
  try {
    const response = await axios.post(`http://localhost:9999/api/invoice/${idStudent}`)
    dispatch({
      type: INVOICE_STUDENT_SUCCESS,
      payload: response.data
    })
    return Promise.resolve(response.data)
  } catch (error) {
    dispatch({
      type: INVOICE_STUDENT_FAILURE,
      payload: error.message
    })
    return Promise.reject(error)
  }
}

export const deleteInvoice = (id_invoice) => async (dispatch) => {
  console.log("...ejecutando...deleteInvoice(id_invoice)")
  try {
    const response = await axios.delete(`http://localhost:9999/api/invoice/${id_invoice}`)
    dispatch({
      type: DELETE_INVOICE_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: DELETE_INVOICE_FAILURE,
      payload: error.message
    })
  }
}

export const fetchClassrooms = () => async (dispatch) => {
  console.log("...ejecutando...fetchClassrooms()")
  try {
    const response = await axios.get('http://localhost:9999/api/classroom')
    dispatch({
      type: LIST_CLASSROOMS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: LIST_CLASSROOMS_FAILURE,
      payload: error.message
    })
  }
}

export const fetchStudentClassrooms = () => async (dispatch) => {
  console.log("...ejecutando...fetchStudentClassrooms()")
  try {
    const response = await axios.get('http://localhost:9999/api/student_classroom')
    dispatch({
      type: STUDENTS_CLASSROOMS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: STUDENTS_CLASSROOMS_FAILURE,
      payload: error.message
    })
  }
}

export const signClassrooms = (info) => async (dispatch) => {
  console.log("...ejecutando...signClassrooms(info)")
  try {
    const response = await axios.post('http://localhost:9999/api/student_classroom/sign', info)
    dispatch({
      type: SIGN_CLASSROOMS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: SIGN_CLASSROOMS_FAILURE,
      payload: error.message
    })
  }
}

export const fetchPrices = () => async (dispatch) => {
  console.log("...ejecutando...fetchPrices()")
  try {
    const response = await axios.get('http://localhost:9999/api/price')
    dispatch({
      type: FETCH_PRICES_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_PRICES_FAILURE,
      payload: error.message
    })
  }
}

export const updatePrices = (newPrices) => async (dispatch) => {
  console.log("...ejecutando...updatePrices(newPrices)")
  try {
    const response = await axios.post('http://localhost:9999/api/price/update', newPrices)
    dispatch({
      type: UPDATE_PRICES_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRICES_FAILURE,
      payload: error.message
    })
  }
}
