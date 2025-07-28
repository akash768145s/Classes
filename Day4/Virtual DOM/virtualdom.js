// Simple Virtual DOM implementation
class VNode {
    constructor(tag, props = {}, children = []) {
        this.tag = tag;
        this.props = props;
        this.children = children;
        this.key = props.key;
    }
}

// Create a virtual node
function h(tag, props, ...children) {
    return new VNode(tag, props || {}, children);
}

// Create a real DOM element from a virtual node
function createElement(vnode) {
    if (typeof vnode === 'string' || typeof vnode === 'number') {
        return document.createTextNode(vnode);
    }

    const element = document.createElement(vnode.tag);

    // Set properties
    for (const [key, value] of Object.entries(vnode.props)) {
        if (key === 'key') continue; // Skip key prop
        if (key === 'className') {
            element.className = value;
        } else if (key === 'style' && typeof value === 'object') {
            Object.assign(element.style, value);
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.substring(2).toLowerCase(), value);
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

// Compare two virtual nodes and generate patches
function diff(oldVNode, newVNode) {
    const patches = [];

    // Node is completely different
    if (oldVNode.tag !== newVNode.tag) {
        patches.push({ type: 'REPLACE', oldVNode, newVNode });
        return patches;
    }

    // Props changed
    const propsPatches = {};
    let propsChanged = false;

    // Check for removed or changed props
    for (const [key, value] of Object.entries(oldVNode.props)) {
        if (key === 'key') continue;
        if (!(key in newVNode.props) || newVNode.props[key] !== value) {
            propsPatches[key] = newVNode.props[key];
            propsChanged = true;
        }
    }

    // Check for added props
    for (const [key, value] of Object.entries(newVNode.props)) {
        if (key === 'key') continue;
        if (!(key in oldVNode.props)) {
            propsPatches[key] = value;
            propsChanged = true;
        }
    }

    if (propsChanged) {
        patches.push({ type: 'PROPS', oldVNode, newVNode, propsPatches });
    }

    // Compare children
    const childPatches = [];
    const maxLength = Math.max(oldVNode.children.length, newVNode.children.length);

    for (let i = 0; i < maxLength; i++) {
        const oldChild = oldVNode.children[i];
        const newChild = newVNode.children[i];

        if (!oldChild) {
            // New child added
            childPatches.push({ type: 'ADD', newVNode: newChild, index: i });
        } else if (!newChild) {
            // Child removed
            childPatches.push({ type: 'REMOVE', oldVNode: oldChild, index: i });
        } else {
            // Child changed, recursively diff
            const childDiff = diff(oldChild, newChild);
            if (childDiff.length > 0) {
                childPatches.push({ type: 'CHILD', patches: childDiff, index: i });
            }
        }
    }

    if (childPatches.length > 0) {
        patches.push({ type: 'CHILDREN', childPatches });
    }

    return patches;
}

// Apply patches to a real DOM node
function applyPatches(node, patches, parentNode = null) {
    for (const patch of patches) {
        switch (patch.type) {
            case 'REPLACE':
                const newNode = createElement(patch.newVNode);
                if (parentNode) {
                    parentNode.replaceChild(newNode, node);
                }
                return newNode;

            case 'PROPS':
                for (const [key, value] of Object.entries(patch.propsPatches)) {
                    if (key === 'className') {
                        node.className = value || '';
                    } else if (key === 'style' && typeof value === 'object') {
                        Object.assign(node.style, value);
                    } else if (key.startsWith('on')) {
                        const eventName = key.substring(2).toLowerCase();
                        if (typeof node[key] === 'function') {
                            node.removeEventListener(eventName, node[key]);
                        }
                        if (typeof value === 'function') {
                            node.addEventListener(eventName, value);
                        }
                    } else if (value === undefined || value === null) {
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
                            const newChildNode = createElement(childPatch.newVNode);
                            if (childPatch.index < node.childNodes.length) {
                                node.insertBefore(newChildNode, node.childNodes[childPatch.index]);
                            } else {
                                node.appendChild(newChildNode);
                            }
                            break;

                        case 'REMOVE':
                            node.removeChild(node.childNodes[childPatch.index]);
                            break;

                        case 'CHILD':
                            applyPatches(node.childNodes[childPatch.index], childPatch.patches, node);
                            break;
                    }
                }
                break;
        }
    }

    return node;
}

// Demonstration code
document.addEventListener('DOMContentLoaded', () => {
    // Initial data
    let items = [
        { id: 1, text: 'Item 1', count: 0 },
        { id: 2, text: 'Item 2', count: 0 },
        { id: 3, text: 'Item 3', count: 0 }
    ];

    // Direct DOM rendering
    const directContainer = document.getElementById('direct-container');
    const directLog = document.getElementById('direct-log');

    function renderDirectDOM() {
        const startTime = performance.now();

        // Clear the container
        directContainer.innerHTML = '';

        // Create nodes
        items.forEach(item => {
            const node = document.createElement('div');
            node.className = 'node';
            node.textContent = `${item.text} (${item.count})`;
            node.dataset.id = item.id;
            directContainer.appendChild(node);
        });

        const endTime = performance.now();
        logOperation(directLog, `Rendered ${items.length} items directly`, endTime - startTime);
    }

    // Virtual DOM rendering
    const virtualContainer = document.getElementById('virtual-container');
    const virtualLog = document.getElementById('virtual-log');
    let oldVirtualDOM = null;

    function renderVirtualDOM() {
        const startTime = performance.now();

        // Create new virtual DOM
        const newVirtualDOM = h('div', {}, ...items.map(item =>
            h('div', { className: 'node', 'data-id': item.id }, `${item.text} (${item.count})`)
        ));

        // First render or update
        if (!oldVirtualDOM) {
            // First render
            const realDOM = createElement(newVirtualDOM);
            virtualContainer.innerHTML = '';
            virtualContainer.appendChild(realDOM);
            logOperation(virtualLog, `Initial render of ${items.length} items`, performance.now() - startTime);
        } else {
            try {
                // Update with diffing
                const diffStartTime = performance.now();
                const patches = diff(oldVirtualDOM, newVirtualDOM);
                const diffTime = performance.now() - diffStartTime;

                // Log the patches for debugging
                console.log('Patches to apply:', patches);
                
                const patchStartTime = performance.now();
                
                if (virtualContainer.firstChild) {
                    applyPatches(virtualContainer.firstChild, patches);
                } else {
                    // If the container is empty for some reason, do a full render
                    const realDOM = createElement(newVirtualDOM);
                    virtualContainer.innerHTML = '';
                    virtualContainer.appendChild(realDOM);
                }
                
                const patchTime = performance.now() - patchStartTime;

                logOperation(virtualLog,
                    `Updated ${items.length} items (Diff: ${diffTime.toFixed(2)}ms, Patch: ${patchTime.toFixed(2)}ms)`,
                    performance.now() - startTime
                );

                // Highlight changes
                setTimeout(() => {
                    visualizeDiff(oldVirtualDOM, newVirtualDOM);
                }, 100);
            } catch (error) {
                console.error('Error updating Virtual DOM:', error);
                
                // Fallback to full render on error
                const realDOM = createElement(newVirtualDOM);
                virtualContainer.innerHTML = '';
                virtualContainer.appendChild(realDOM);
                
                logOperation(virtualLog, `Error during update, performed full re-render of ${items.length} items`, performance.now() - startTime);
            }
        }

        // Save for next comparison
        oldVirtualDOM = newVirtualDOM;
    }

    // Visualize the differences
    function visualizeDiff(oldVDOM, newVDOM) {
        if (!oldVDOM || !newVDOM) return;

        const oldItems = oldVDOM.children;
        const newItems = newVDOM.children;
        const nodes = virtualContainer.firstChild.childNodes;

        // Check for modifications
        for (let i = 0; i < Math.min(oldItems.length, newItems.length); i++) {
            const oldText = oldItems[i].children.length > 0 ? oldItems[i].children[0] : oldItems[i];
            const newText = newItems[i].children.length > 0 ? newItems[i].children[0] : newItems[i];

            if (typeof oldText === 'string' && typeof newText === 'string') {
                if (oldText !== newText) {
                    nodes[i].classList.add('modified');
                    setTimeout(() => {
                        nodes[i].classList.remove('modified');
                    }, 2000);
                }
            } else {
                // Compare text content for non-string nodes
                const oldContent = oldItems[i].props['data-id'] + oldItems[i].children.toString();
                const newContent = newItems[i].props['data-id'] + newItems[i].children.toString();

                if (oldContent !== newContent) {
                    nodes[i].classList.add('modified');
                    setTimeout(() => {
                        nodes[i].classList.remove('modified');
                    }, 2000);
                }
            }
        }

        // Check for additions
        if (newItems.length > oldItems.length) {
            for (let i = oldItems.length; i < newItems.length; i++) {
                nodes[i].classList.add('added');
                setTimeout(() => {
                    nodes[i].classList.remove('added');
                }, 2000);
            }
        }

        // Check for removals (highlight in the direct DOM for comparison)
        if (oldItems.length > newItems.length) {
            const directNodes = directContainer.childNodes;
            for (let i = newItems.length; i < Math.min(oldItems.length, directNodes.length); i++) {
                if (directNodes[i]) {
                    directNodes[i].classList.add('removed');
                    setTimeout(() => {
                        if (directNodes[i]) {
                            directNodes[i].classList.remove('removed');
                        }
                    }, 2000);
                }
            }
        }
    }

    // Helper to log operations
    function logOperation(logElement, message, time) {
        const logEntry = document.createElement('div');
        logEntry.textContent = `${message} (${time.toFixed(2)}ms)`;
        logEntry.classList.add('highlight');
        logElement.appendChild(logEntry);
        logElement.scrollTop = logElement.scrollHeight;
    }

    // Initial render
    renderDirectDOM();
    renderVirtualDOM();

    // Update buttons
    document.getElementById('update-direct').addEventListener('click', () => {
        // Modify data
        updateData();
        renderDirectDOM();
    });

    document.getElementById('update-virtual').addEventListener('click', () => {
        // Modify data
        updateData();
        renderVirtualDOM();
        
        // Log the update for clarity
        console.log('Virtual DOM updated with new data:', JSON.stringify(items));
    });

    // Update data randomly
    function updateData() {
        const operations = ['increment', 'add', 'remove', 'modify'];
        const operation = operations[Math.floor(Math.random() * operations.length)];

        switch (operation) {
            case 'increment':
                // Increment counts
                items.forEach(item => {
                    if (Math.random() > 0.5) {
                        item.count++;
                    }
                });
                break;

            case 'add':
                // Add a new item
                if (items.length < 10) {
                    const newId = Math.max(...items.map(item => item.id)) + 1;
                    items.push({ id: newId, text: `Item ${newId}`, count: 0 });
                } else {
                    // Just increment if we have too many items
                    items.forEach(item => {
                        if (Math.random() > 0.5) {
                            item.count++;
                        }
                    });
                }
                break;

            case 'remove':
                // Remove an item
                if (items.length > 1) {
                    const indexToRemove = Math.floor(Math.random() * items.length);
                    items.splice(indexToRemove, 1);
                } else {
                    // Just increment if we only have one item
                    items[0].count++;
                }
                break;

            case 'modify':
                // Modify text
                const indexToModify = Math.floor(Math.random() * items.length);
                items[indexToModify].text = `Modified Item ${items[indexToModify].id}`;
                break;
        }
    }
}); 