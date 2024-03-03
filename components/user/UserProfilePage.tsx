"use client"
import React, { useState, useEffect } from 'react'
import { useUserDataStore } from '@/store/userDataStore'
import ProfileForm from '@/components/user/ProfileForm'
const UserProfilePage = () => {
    const { userData } = useUserDataStore()

    return (
        <div className='w-full h-full flex flex-col justify-start items-center space-y-6'>
            <h1 className='text-[2rem] sm:text-[3rem] font-bold text-center py-20 w-full bg-red-500 whitespace-nowrap overflow-hidden text-ellipsis'>Hi, {userData?.name}</h1>
            <div className="w-full overflow-y-auto px-5 max-w-[800px] shrink">
                <h3 className="text-lg font-medium">Profile</h3>
                <p className="text-sm text-muted-foreground">
                    Edit Your Profile
                </p>
                <ProfileForm />
            </div>
        </div>
    )
}

export default UserProfilePage