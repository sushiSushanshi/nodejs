const mysql = require('mysql');
//connection pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.HOST,
    user:process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306
}); 
//record
exports.record = (req,res)=>{
    
    pool.getConnection((err,connection)=>{
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId);
        connection.query('select * from students',(err,rows)=>{
            if(err){console.log(err)}
            else{
                res.render('record',{rows});
            }
            console.log(rows);
        });
    });
}

//starting of the page
exports.view = (req,res)=>{
    res.render('index');
}
//redirects to teacher login page
exports.teacherVerification = (req,res)=>{
    res.render('teacherLogin');
}
exports.teacherAuth=(req,res)=>{
    pool.getConnection((err,connection)=>{
        var teacherid = req.body.teacherid;
        var password = req.body.password;
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId); 
        connection.query('select * from teachers where teacherid= ? AND password= ?',[teacherid,password],(err,results)=>{
            if(results.length>0){
                res.redirect('/record');
            }
            else{
                res.render('teacherLogin',{ alert: 'Wrong Credentials !!!'});
            }
            console.log(results);
        });
    });

}

//redirects to result search page 
exports.student = (req,res)=>{
    res.render('findResult');
}

//to find the result by the student
exports.find = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId);

        var roll = req.body.roll;
        var name = req.body.name;
    
        connection.query('select * from students where roll= ? AND name= ?',[roll,name],(err,rows)=>{
            if(err){console.log(err)}
            else{
                if(rows.length>0){
                    res.render('result',{rows});
                }
                else{
                    res.render('findResult',{ alert: 'Result not found !!!'})
                }
            }
            console.log(rows);
        });
    });
}

//renders to add result form
exports.addResultForm = (req,res)=>{
    res.render('addResult');
}
//for adding result
exports.addResult = (req,res)=>{
    const roll = req.body.roll;
    const name = req.body.name;
    const date_of_birth = req.body.date_of_birth;
    const score = req.body.score;

    pool.getConnection((err,connection)=>{
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId);

        connection.query('insert into students set roll=?,name=?,date_of_birth=?,score=?',[roll,name,date_of_birth,score],(err,rows)=>{
            connection.release();
            if(err){console.log(err)}
            else{
                res.render('addResult',{ alert: 'Result added successfully'});
            }
            console.log(rows);
        });
    });
}

//render to edit user form
exports.editResultForm = (req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId);
        connection.query('select * from students where roll=?',[req.params.roll],(err,rows)=>{
            if(err){console.log(err)}
            else{
                res.render('editResult',{rows});
            }
            console.log(rows);
        });
    });
}

//to edit student credentials
exports.update = (req,res)=>{
    const {roll,name,date_of_birth,score}=req.body;

    pool.getConnection((err,connection)=>{
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId);
        connection.query('update students set name=?,date_of_birth=?,score=? where roll=?',[name,date_of_birth,score,req.params.roll],(err,rows)=>{
            //connection.release();
            if(err){console.log(err)}
            else{
                pool.getConnection((err,connection)=>{
                    if(err) {console.log(err)};
                    console.log('connected as ID'+connection.threadId);
                    connection.query('select * from students where roll=?',[req.params.roll],(err,rows)=>{
                        if(err){console.log(err)}
                        else{
                            res.render('editResult',{rows,alert: 'Result updated successfully'});
                        }
                        console.log(rows);
                    });
                });
            }
            console.log(rows);
        });
    });
}
//delete result
exports.delete = (req,res)=>{
    pool.getConnection((err,connection)=>{
        
        if(err) {console.log(err)};
        console.log('connected as ID'+connection.threadId);
        connection.query('delete from students where roll=?',[req.params.roll],(err,rows)=>{
            if(err){}
            else{
                res.redirect('/record');
            }
            console.log(rows);
        });
    });
}
