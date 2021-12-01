# QuickSellFrontEndAssignment

Making a counter with a specific design, which makes two kinds of API calls : 

1 : GET request to get the initial counter value 
        I achieved this by making use of useEffect hook whose dependency array is empty as we only make this call once (at first render)
2 : PUT request to the API to update the counter value along with my name
        I achieved this the same way but instead of being empty, our dependency array contains the state "counter", thus whenever there is a change in the
         value of our counter, this hook will forward the request.
         
 I used axios library to handle the requests in a more manageabe manner. Although I should've put more catch blocks to make the code more robust.
 
         
         
