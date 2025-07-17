// Super Simple Virtual DOM Implementation
// ----------------------------------------

// Virtual DOM Node
class VNode {
    constructor(tag, props = {}, children = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
    }
}

// Create virtual node
function h(tag, props, ...children) {
    return new VNode(tag, props || {}, children);
}

// Create real DOM from virtual node
function createElement(vnode) {
    // Handle text nodes
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(vnode);
    }

    // Create element
    const element = document.createElement(vnode.tag);

    // Set attributes
    for (const [key, value] of Object.entries(vnode.props)) {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            const eventName = key.substring(2).toLowerCase();
            element.addEventListener(eventName, value);
        } else {
            element.setAttribute(key, value);
        }
    }

    // Create and append children
    for (const child of vnode.children) {
        element.appendChild(createElement(child));
    }

    return element;
}

// Find differences between two virtual nodes
function diff(oldVNode, newVNode) {
    const patches = [];

    // Complete node replacement needed
    if (oldVNode.tag !== newVNode.tag) {
        patches.push({ type: 'REPLACE', newVNode });
        return patches;
    }

    // Check for property changes
    const propChanges = {};
    let hasChanges = false;

    // Check old props that changed
    for (const [key, value] of Object.entries(oldVNode.props)) {
        if (newVNode.props[key] !== value) {
            propChanges[key] = newVNode.props[key];
            hasChanges = true;
        }
    }

    // Check new props that were added
    for (const [key, value] of Object.entries(newVNode.props)) {
        if (!(key in oldVNode.props)) {
            propChanges[key] = value;
            hasChanges = true;
        }
    }

    if (hasChanges) {
        patches.push({ type: 'PROPS', propChanges });
    }

    // Compare children
    const childPatches = [];
    const maxLength = Math.max(oldVNode.children.length, newVNode.children.length);

    for (let i = 0; i < maxLength; i++) {
        const oldChild = oldVNode.children[i];
        const newChild = newVNode.children[i];

        if (!oldChild) {
            // New child added
            childPatches.push({ type: 'ADD', index: i, newNode: newChild });
        } else if (!newChild) {
            // Child removed
            childPatches.push({ type: 'REMOVE', index: i });
        } else if (typeof oldChild === 'string' && typeof newChild === 'string') {
            // Text node changed
            if (oldChild !== newChild) {
                childPatches.push({ type: 'TEXT', index: i, text: newChild });
            }
        } else {
            // Recursively diff child nodes
            const childDiff = diff(oldChild, newChild);
            if (childDiff.length > 0) {
                childPatches.push({ type: 'NODE', index: i, patches: childDiff });
            }
        }
    }

    if (childPatches.length > 0) {
        patches.push({ type: 'CHILDREN', childPatches });
    }

    return patches;
}

// Apply patches to real DOM
function applyPatches(node, patches) {
    for (const patch of patches) {
        switch (patch.type) {
            case 'REPLACE':
                const newNode = createElement(patch.newVNode);
                node.parentNode.replaceChild(newNode, node);
                return newNode;

            case 'PROPS':
                for (const [key, value] of Object.entries(patch.propChanges)) {
                    if (key === 'className') {
                        node.className = value || '';
                    } else if (value === undefined) {
                        node.removeAttribute(key);
                    } else {
                        node.setAttribute(key, value);
                    }
                }
                break;

            case 'CHILDREN':
                for (const childPatch of patch.childPatches) {
                    switch (childPatch.type) {
                        case 'ADD':
                            const newChildNode = createElement(childPatch.newNode);
                            if (childPatch.index >= node.childNodes.length) {
                                node.appendChild(newChildNode);
                            } else {
                                node.insertBefore(newChildNode, node.childNodes[childPatch.index]);
                            }
                            break;

                        case 'REMOVE':
                            node.removeChild(node.childNodes[childPatch.index]);
                            break;

                        case 'TEXT':
                            node.childNodes[childPatch.index].nodeValue = childPatch.text;
                            break;

                        case 'NODE':
                            applyPatches(node.childNodes[childPatch.index], childPatch.patches);
                            break;
                    }
                }
                break;
        }
    }

    return node;
}

// Todo List Application
// ----------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Todo items
    let todos = [
        { id: 1, text: 'Learn about Virtual DOM', completed: false },
        { id: 2, text: 'Build a simple app', completed: false },
        { id: 3, text: 'Share with friends', completed: false }
    ];

    // DOM elements
    const normalContainer = document.getElementById('normal-dom-container');
    const virtualContainer = document.getElementById('virtual-dom-container');
    const todoInput = document.getElementById('todo-input');
    const addTodoBtn = document.getElementById('add-todo');
    const normalTimer = document.getElementById('normal-timer');
    const virtualTimer = document.getElementById('virtual-timer');

    // Keep track of previous virtual DOM
    let previousVirtualDOM = null;

    // Event listeners
    addTodoBtn.addEventListener('click', addTodo);
    document.getElementById('add-many').addEventListener('click', addManyTodos);
    document.getElementById('complete-random').addEventListener('click', completeRandomTodos);
    document.getElementById('delete-random').addEventListener('click', deleteRandomTodos);

    // Initial render
    renderNormalDOM();
    renderVirtualDOM();

    // Add a new todo
    function addTodo() {
        const text = todoInput.value.trim();
        if (text) {
            const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
            todos.push({ id: newId, text, completed: false });
            todoInput.value = '';

            renderNormalDOM();
            renderVirtualDOM();
        }
    }

    // Add many random todos
    function addManyTodos() {
        const randomTasks = [
            'Buy groceries',
            'Call mom',
            'Finish homework',
            'Go to gym',
            'Read a book',
            'Watch a movie',
            'Clean the house',
            'Pay bills',
            'Meet friends',
            'Cook dinner',
            'Walk the dog',
            'Fix the bike',
            'Water plants',
            'Attend meeting',
            'Write email'
        ];

        const startId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

        for (let i = 0; i < 10; i++) {
            const randomIndex = Math.floor(Math.random() * randomTasks.length);
            const text = randomTasks[randomIndex] + ' ' + (startId + i);
            todos.push({ id: startId + i, text, completed: false });
        }

        renderNormalDOM();
        renderVirtualDOM();
    }

    // Complete random todos
    function completeRandomTodos() {
        if (todos.length === 0) return;

        const incompleteTodos = todos.filter(todo => !todo.completed);
        if (incompleteTodos.length === 0) return;

        // Complete 1-3 random todos
        const count = Math.min(Math.floor(Math.random() * 3) + 1, incompleteTodos.length);

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * incompleteTodos.length);
            const todoToComplete = incompleteTodos[randomIndex];

            const actualIndex = todos.findIndex(t => t.id === todoToComplete.id);
            if (actualIndex !== -1) {
                todos[actualIndex].completed = true;
            }

            // Remove from incomplete list to avoid selecting again
            incompleteTodos.splice(randomIndex, 1);
        }

        renderNormalDOM();
        renderVirtualDOM();
    }

    // Delete random todos
    function deleteRandomTodos() {
        if (todos.length === 0) return;

        // Delete 1-3 random todos
        const count = Math.min(Math.floor(Math.random() * 3) + 1, todos.length);

        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * todos.length);
            todos.splice(randomIndex, 1);
        }

        renderNormalDOM();
        renderVirtualDOM();
    }

    // Render using normal DOM approach
    function renderNormalDOM() {
        const startTime = performance.now();

        // Clear container and rebuild everything
        normalContainer.innerHTML = '';

        // Create todo list
        const todoList = document.createElement('div');

        // Add each todo
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = `todo-item${todo.completed ? ' completed' : ''}`;
            todoItem.textContent = todo.text;
            todoItem.dataset.id = todo.id;

            // Add click handler to toggle completion
            todoItem.addEventListener('click', () => {
                const id = parseInt(todoItem.dataset.id);
                const index = todos.findIndex(t => t.id === id);
                if (index !== -1) {
                    todos[index].completed = !todos[index].completed;
                    renderNormalDOM();
                    renderVirtualDOM();
                }
            });

            // Add delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.style.float = 'right';
            deleteBtn.style.background = 'none';
            deleteBtn.style.border = 'none';
            deleteBtn.style.cursor = 'pointer';
            deleteBtn.style.padding = '0 5px';

            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(todoItem.dataset.id);
                todos = todos.filter(t => t.id !== id);
                renderNormalDOM();
                renderVirtualDOM();
            });

            todoItem.appendChild(deleteBtn);
            todoList.appendChild(todoItem);
        });

        normalContainer.appendChild(todoList);

        const endTime = performance.now();
        normalTimer.textContent = `Time: ${(endTime - startTime).toFixed(2)}ms`;
    }

    // Render using Virtual DOM approach
    function renderVirtualDOM() {
        const startTime = performance.now();

        // Create new virtual DOM tree
        const newVirtualDOM = h('div', {},
            ...todos.map(todo =>
                h('div', {
                    className: `todo-item${todo.completed ? ' completed' : ''}`,
                    'data-id': todo.id,
                    onClick: () => {
                        const index = todos.findIndex(t => t.id === todo.id);
                        if (index !== -1) {
                            todos[index].completed = !todos[index].completed;
                            renderNormalDOM();
                            renderVirtualDOM();
                        }
                    }
                },
                    todo.text,
                    h('button', {
                        style: 'float: right; background: none; border: none; cursor: pointer; padding: 0 5px;',
                        onClick: (e) => {
                            e.stopPropagation();
                            todos = todos.filter(t => t.id !== todo.id);
                            renderNormalDOM();
                            renderVirtualDOM();
                        }
                    }, '❌')
                )
            )
        );

        // First render or update with diffing
        if (!previousVirtualDOM) {
            // First render - create real DOM from virtual DOM
            const realDOM = createElement(newVirtualDOM);
            virtualContainer.innerHTML = '';
            virtualContainer.appendChild(realDOM);
        } else {
            // Find differences and apply only necessary changes
            const diffTime = performance.now();
            const patches = diff(previousVirtualDOM, newVirtualDOM);

            // Apply patches to real DOM
            if (virtualContainer.firstChild) {
                applyPatches(virtualContainer.firstChild, patches);

                // Highlight changed items
                highlightChanges(previousVirtualDOM, newVirtualDOM);
            }
        }

        // Save current virtual DOM for next comparison
        previousVirtualDOM = newVirtualDOM;

        const endTime = performance.now();
        virtualTimer.textContent = `Time: ${(endTime - startTime).toFixed(2)}ms`;
    }

    // Highlight changes for visual effect
    function highlightChanges(oldVDOM, newVDOM) {
        if (!oldVDOM || !newVDOM) return;

        // Get all todo items in the virtual DOM container
        const todoItems = virtualContainer.querySelectorAll('.todo-item');

        // Compare old and new children
        const oldChildren = oldVDOM.children;
        const newChildren = newVDOM.children;

        // Find added or modified items
        for (let i = 0; i < newChildren.length; i++) {
            const newChild = newChildren[i];

            // Skip if we don't have a corresponding DOM element
            if (i >= todoItems.length) continue;

            // Check if this is a new item or modified item
            if (i >= oldChildren.length ||
                oldChildren[i].props.className !== newChild.props.className ||
                oldChildren[i].children[0] !== newChild.children[0]) {

                todoItems[i].classList.add('highlight');
                setTimeout(() => {
                    if (todoItems[i]) {
                        todoItems[i].classList.remove('highlight');
                    }
                }, 1000);
            }
        }
    }
}); 