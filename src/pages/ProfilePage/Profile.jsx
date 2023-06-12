/* eslint-disable no-unused-vars */

import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Product } from "../../components/Product/Product"
import { api } from '../../utils/api'
import { useParams } from 'react-router-dom'
import { CardsContext } from '../../context/cardContext'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from '../../storage/slices/userSlice'


export const ProfilePage = () => {
    const dispatch = useDispatch();
    const {data}  = useSelector(s => s.user)

    useEffect(() => {
        dispatch(getUser('hello from profile'))
    }, [dispatch])
    return (
        <>
            Profile
        <div>
            <img src={data?.avatar}  alt='this is avatar'/> 
        </div>
        {/* {errors ? } */}

        </>
    )
}