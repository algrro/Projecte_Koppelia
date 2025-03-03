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
  INVOICE_STUDENT_FAILURE
} from './constants'

export const fetchStudents = () => async (dispatch) => {
  console.log("...ejecutando...fetchStudents()")
  try {
    const response = await axios.get('http://localhost:9999/api/student')
    const response2 = await axios.get('http://localhost:9999/api/student_classroom')
    dispatch({
      type: FETCH_STUDENTS_SUCCESS,
      payload: {
        students: response.data,
        st_class: response2.data
      }
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
