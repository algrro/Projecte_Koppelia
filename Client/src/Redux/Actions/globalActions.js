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
  DELETE_INVOICE_FAILURE,
  FETCH_TEACHERS_SUCCESS,
  FETCH_TEACHERS_FAILURE,
  UPDATE_TEACHERS_SUCCESS,
  UPDATE_TEACHERS_FAILURE,
  UPDATE_CLASSROOMS_SUCCESS,
  UPDATE_CLASSROOMS_FAILURE
} from './constants'

const URI = "http://localhost:9999/api"

export const fetchStudents = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URI}/student`)
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
  try {
    const response = await axios.post(`${URI}/student/add_student`, { ...studentData, birth_date: new Date(studentData.birth_date) })
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
  try {
    const response = await axios.post(`${URI}/student/edit_student/${studentEdited.id_student}`, { ...studentEdited, birth_date: new Date(studentEdited.birth_date) })
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
  try {
    const response = await axios.delete(`${URI}/student/${id_student}`)
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
  try {
    const response = await axios.post(`${URI}/invoice/${idStudent}`)
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
  try {
    const response = await axios.delete(`${URI}/invoice/${id_invoice}`)
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
  try {
    const response = await axios.get(`${URI}/classroom`)
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
  try {
    const response = await axios.get(`${URI}/student_classroom`)
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
  try {
    const response = await axios.post(`${URI}/student_classroom/sign`, info)
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
  try {
    const response = await axios.get(`${URI}/price`)
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
  try {
    const response = await axios.post(`${URI}/price/update`, newPrices)
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

export const fetchTeachers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${URI}/teacher`)
    dispatch({
      type: FETCH_TEACHERS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: FETCH_TEACHERS_FAILURE,
      payload: error.message
    })
  }
}

export const updateTeachers = (newTeachers) => async (dispatch) => {
  try {
    const response = await axios.post(`${URI}/teacher/update`, newTeachers)
    dispatch({
      type: UPDATE_TEACHERS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: UPDATE_TEACHERS_FAILURE,
      payload: error.message
    })
  }
}

export const updateClassrooms = (info) => async (dispatch) => {
  try {
    const response = await axios.post(`${URI}/classroom/update`, info)
    dispatch({
      type: UPDATE_CLASSROOMS_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: UPDATE_CLASSROOMS_FAILURE,
      payload: error.message
    })
  }
}
