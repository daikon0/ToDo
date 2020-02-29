'use strict';
let tasks = new Map();

const fs = require('fs');
const fileName = './tasks.json';

try {
    const data = fs.readFileSync(fileName, 'utf8');
    tasks = new Map(JSON.parse(data));
} catch (ignore) {
    console.log(fileName + 'から復元できませんでした')
}

/**
 * タスクをファイルに保存する
 */
function saveTasks() {
    fs.writeFileSync(fileName, JSON.stringify(Array.from(tasks)), 'utf8');
}


/**
 * TODO add
 * @param {string} task
 */
function todo(task){
    tasks.set(task, false);
    saveTasks();
}

/**
 * タスク完了したかどうか
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了したか
 */
function isDone(taskAndIsDonePair) {
    return taskAndIsDonePair[1];
}

/**
 * タスク完了していない
 * @param {array} taskAndIsDonePair
 * @return {boolean} 完了していないかどうか
 */
function isNotDone(taskAndIsDonePair) {
    return !isDone(taskAndIsDonePair);
}

/**
 * TODO list
 * @return {array}
 */
function list(){
    return Array.from(tasks)
        .filter(isNotDone)
        .map(t => t[0]);
}

/**
 * todoを完了状態にする
 */
function done(task) {
    if(tasks.has(task)) {
        tasks.set(task, true);
        saveTasks();
    }
}

function donelist() {
    return Array.from(tasks)
        .filter(isDone)
        .map(t => t[0]);
}

/**
 * 項目を削除する
 */
function del(task) {
    tasks.delete(task);
    saveTasks();
}
module.exports = { 
    todo,
    list,
    done,
    donelist,
    del
 };