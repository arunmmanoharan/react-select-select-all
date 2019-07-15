# react-select-select-all
A Select-All feature built on top of React Select

This is a project for a Select All feature on top of React-Select ( https://react-select.com ).

Heavily inspired from the workflow of Lillaeli ( https://github.com/LillaEli )

Please install using the following command:

`npm install react-select-select-all --save`

It takes in all props related to react-select (https://react-select.com/props). The main/mandatory props are as follows:

`data: Options needed to be rendered -> Must be an array of objects with keys => label,value
onHandleSelectChange: The callback method to update the state in the parent with selectedData
containerName: The container name for the selectAll component -> preferably the state key it relates to
value: The state data to be passed in
isMulti: true -> Incase you need multi-select
isSelectAll: true -> Incase you need an All option
closeMenuOnSelect: false -> Incase you need to not close the dropdown when you select a value `

P.S: SelectAll works only when isMulti is true, so please keep that in mind.
This is my first package. Please let me know how I can improve it.
