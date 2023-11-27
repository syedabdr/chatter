// createGroup.js file

import { db } from '../firebaseDB';
import { getDatabase, ref as reference, push, set } from 'firebase/database';

const database = getDatabase();

export const createGroup = async (groupName, members) => {
    // Get a reference to the "Groups" node
   
    try {
        // Generate a unique key for the new group
        const newGroupRef = push(reference(database, 'Groups'));
        

         const newGroupKey = newGroupRef.key;

         const groupPath = `Groups/${newGroupKey}`;
         
        // Set the "NameofGroup" and "Members" nodes under the new group
        await set(reference(database, `${groupPath}/nameofGroup`), groupName);
        
        await set(reference(database, `${groupPath}/members`), members);
        

        console.log("Group data saved to the database successfully!");
    } catch (error) {
        console.error("Error creating group:", error);
        throw error;
    }
};
