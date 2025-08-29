// DSA Spaced Repetition Tool - Enhanced with Sub-Categories and Edit Functionality

class DSASpacedRepetitionTool {
    constructor() {
        // Default categories from the application data
        this.defaultCategories = [
            "Array", "Tree", "Sorting", "Dynamic Programming", "Graph",
            "String", "Hash Table", "Stack", "Queue", "Backtracking",
            "Greedy", "Binary Search", "Linked List", "Heap", "Trie", "Bit Manipulation"
        ];

        // Default sub-categories
        this.defaultSubCategories = {
            "Array": ["Two-Pointer", "Sliding Window", "Prefix Sum"],
            "Tree": ["Traversal", "Binary Search Tree", "Construction"],
            "Sorting": ["Divide & Conquer", "Comparison Sort", "Non-Comparison"],
            "Dynamic Programming": ["Memoization", "Tabulation", "Optimization"],
            "Graph": ["Traversal", "Shortest Path", "Minimum Spanning Tree"],
            "String": ["Pattern Matching", "Manipulation", "Parsing"],
            "Hash Table": ["Hashing", "Collision Resolution", "Applications"],
            "Stack": ["Basic Operations", "Expression Evaluation", "Applications"],
            "Queue": ["Basic Operations", "Priority Queue", "Applications"],
            "Backtracking": ["Permutations", "Combinations", "Constraint Satisfaction"],
            "Greedy": ["Activity Selection", "Huffman Coding", "Optimization"],
            "Binary Search": ["Search Space", "Binary Search Tree", "Applications"],
            "Linked List": ["Single", "Double", "Circular"],
            "Heap": ["Min Heap", "Max Heap", "Applications"],
            "Trie": ["Construction", "Search", "Applications"],
            "Bit Manipulation": ["Basic Operations", "Bit Masks", "Applications"]
        };

        // Sample topics data with sub-categories
        this.sampleTopics = [
            {
                id: "1",
                name: "Two Pointers Technique",
                category: "Array",
                subCategory: "Two-Pointer",
                description: "Using two pointers to solve problems efficiently, like finding pairs or detecting cycles",
                easeFactor: 2.5,
                interval: 0,
                repetitions: 0,
                nextReviewDate: "2025-08-18",
                dateAdded: "2025-08-17"
            },
            {
                id: "2",
                name: "Binary Tree Traversal",
                category: "Tree",
                subCategory: "Traversal",
                description: "Inorder, preorder, postorder traversal methods both recursive and iterative",
                easeFactor: 2.3,
                interval: 3,
                repetitions: 2,
                nextReviewDate: "2025-08-15",
                dateAdded: "2025-08-10"
            },
            {
                id: "3",
                name: "Merge Sort Algorithm",
                category: "Sorting",
                subCategory: "Divide & Conquer",
                description: "Divide and conquer sorting algorithm with O(n log n) time complexity",
                easeFactor: 2.6,
                interval: 7,
                repetitions: 3,
                nextReviewDate: "2025-08-18",
                dateAdded: "2025-08-05"
            },
            {
                id: "4",
                name: "Dynamic Programming - Fibonacci",
                category: "Dynamic Programming",
                subCategory: "Memoization",
                description: "Using memoization and tabulation to optimize recursive solutions",
                easeFactor: 2.1,
                interval: 1,
                repetitions: 1,
                nextReviewDate: "2025-08-18",
                dateAdded: "2025-08-16"
            },
            {
                id: "5",
                name: "Graph BFS/DFS",
                category: "Graph",
                subCategory: "Traversal",
                description: "Breadth-first and depth-first search algorithms for graph traversal",
                easeFactor: 2.4,
                interval: 4,
                repetitions: 2,
                nextReviewDate: "2025-08-19",
                dateAdded: "2025-08-12"
            },
            {
                id: "6",
                name: "Sliding Window Pattern",
                category: "Array",
                subCategory: "Sliding Window",
                description: "Technique for finding subarrays that satisfy certain conditions efficiently",
                easeFactor: 2.7,
                interval: 12,
                repetitions: 4,
                nextReviewDate: "2025-08-20",
                dateAdded: "2025-08-01"
            }
        ];

        this.topics = [];
        this.categories = [];
        this.subCategories = {};
        this.currentView = 'dashboard';
        this.reviewSession = null;
        this.selectedCategoryFilter = 'all';
        this.selectedSubCategoryFilter = 'all';
        this.editingTopicId = null;

        this.init();
    }

    async init() {
        // this.loadFromLocalStorage();
        await this.loadFromCloud();
        this.bindEvents();
        this.populateCategoryDropdowns();
        this.updateDashboard();
    }

    // Local Storage Management
    loadFromLocalStorage() {
        try {
            const savedTopics = localStorage.getItem('dsaTool_topics');
            const savedCategories = localStorage.getItem('dsaTool_categories');
            const savedSubCategories = localStorage.getItem('dsaTool_subCategories');

            if (savedTopics) {
                this.topics = JSON.parse(savedTopics);
            } else {
                this.topics = [...this.sampleTopics];
            }

            if (savedCategories) {
                this.categories = JSON.parse(savedCategories);
            } else {
                this.categories = [...this.defaultCategories];
            }

            if (savedSubCategories) {
                this.subCategories = JSON.parse(savedSubCategories);
            } else {
                this.subCategories = { ...this.defaultSubCategories };
            }

            // Always save after loading to ensure data is persisted
            this.saveToCloud();
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.topics = [...this.sampleTopics];
            this.categories = [...this.defaultCategories];
            this.subCategories = { ...this.defaultSubCategories };
            this.saveToCloud();
        }
    }

    // saveToCloud() {
    //     try {
    //         localStorage.setItem('dsaTool_topics', JSON.stringify(this.topics));
    //         localStorage.setItem('dsaTool_categories', JSON.stringify(this.categories));
    //         localStorage.setItem('dsaTool_subCategories', JSON.stringify(this.subCategories));
    //     } catch (error) {
    //         console.error('Error saving to localStorage:', error);
    //         this.showAlert('Unable to save data. Your browser storage might be full.', 'error');
    //     }
    // }
    async saveToCloud() {
        const BIN_ID = "68a31726ae596e708fcd3664";
        const API_KEY = "$2a$10$jbZRSaXjLhmKfqWAR9MSXO/m7BlxcvHIg7sW3KABR.P9EQlrps2Hm";
        try {
            await fetch("https://api.jsonbin.io/v3/b/"+BIN_ID, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": API_KEY
            },
            body: JSON.stringify({
                topics: this.topics,
                categories: this.categories,
                subCategories: this.subCategories
            })
            });
        } catch (error) {
            console.error("Error saving:", error);
            this.showAlert("Could not save to cloud.", "error");
        }
    }
    async loadFromCloud() {
        const BIN_ID = "68a31726ae596e708fcd3664";
        const API_KEY = "$2a$10$jbZRSaXjLhmKfqWAR9MSXO/m7BlxcvHIg7sW3KABR.P9EQlrps2Hm";
        try {
            const res = await fetch("https://api.jsonbin.io/v3/b/"+BIN_ID+"/latest", {
            headers: { "X-Master-Key": API_KEY }
            });
            const data = await res.json();

            this.topics = data.record.topics || this.sampleTopics;
            this.categories = data.record.categories || this.defaultCategories;
            this.subCategories = data.record.subCategories || this.defaultSubCategories;
        } catch (error) {
            console.error("Error loading:", error);
            this.topics = [...this.sampleTopics];
            this.categories = [...this.defaultCategories];
            this.subCategories = { ...this.defaultSubCategories };
        }
    }



    // Event Binding
    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.getAttribute('data-view');
                if (view) {
                    this.switchView(view);
                }
            });
        });

        // Add Topic Form
        const addTopicForm = document.getElementById('add-topic-form');
        if (addTopicForm) {
            addTopicForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addTopic();
            });
        }

        // Edit Topic Form
        const editTopicForm = document.getElementById('edit-topic-form');
        if (editTopicForm) {
            editTopicForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateTopic();
            });
        }

        // Category checkbox change (Add Topic)
        const addCatsContainer = document.getElementById('topic-additional-categories');
        if (addCatsContainer) {
            addCatsContainer.addEventListener('change', () => {
                this.updateSubcategoryFromSelected('add');
            });
        }

        // Category checkbox change (Edit Topic)
        const editCatsContainer = document.getElementById('edit-topic-additional-categories');
        if (editCatsContainer) {
            editCatsContainer.addEventListener('change', () => {
                this.updateSubcategoryFromSelected('edit');
            });
        }

        // Sub-category selection change for Add Topic
        const subcategorySelect = document.getElementById('topic-subcategory');
        if (subcategorySelect) {
            subcategorySelect.addEventListener('change', (e) => {
                this.handleSubCategorySelection(e.target.value, 'add');
            });
        }

        // Sub-category selection change for Edit Topic
        const editSubcategorySelect = document.getElementById('edit-topic-subcategory');
        if (editSubcategorySelect) {
            editSubcategorySelect.addEventListener('change', (e) => {
                this.handleSubCategorySelection(e.target.value, 'edit');
            });
        }

        // Category filter change
        const categoryFilter = document.getElementById('category-filter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.selectedCategoryFilter = e.target.value;
                this.updateSubCategoryFilter();
                this.updateDashboard();
            });
        }

        // Sub-category filter change
        const subcategoryFilter = document.getElementById('subcategory-filter');
        if (subcategoryFilter) {
            subcategoryFilter.addEventListener('change', (e) => {
                this.selectedSubCategoryFilter = e.target.value;
                this.updateDashboard();
            });
        }

        // Review buttons
        const startReviewBtn = document.getElementById('start-review-btn');
        if (startReviewBtn) {
            startReviewBtn.addEventListener('click', () => {
                this.startReviewSession();
            });
        }

        const endReviewBtn = document.getElementById('end-review-btn');
        if (endReviewBtn) {
            endReviewBtn.addEventListener('click', () => {
                this.endReviewSession();
            });
        }

        // Question picker change
        const questionPicker = document.getElementById('question-picker');
        if (questionPicker) {
            questionPicker.addEventListener('change', (e) => {
                const topicId = e.target.value;
                if (!this.reviewSession || !topicId) return;

                // Only allow selecting from remaining items (not completed)
                const completedIds = new Set(this.reviewSession.completed.map(c => c.topic.id));
                const index = this.reviewSession.items.findIndex(
                    (t, i) => t.id === topicId && !completedIds.has(t.id)
                );
                if (index !== -1) {
                    this.reviewSession.currentIndex = index;
                    this.updateReviewInterface();
                }
            });
        }

        // Difficulty buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const difficulty = parseInt(e.target.getAttribute('data-difficulty'));
                this.answerReview(difficulty);
            });
        });

        // Review complete actions
        const backToDashboardBtn = document.getElementById('back-to-dashboard');
        if (backToDashboardBtn) {
            backToDashboardBtn.addEventListener('click', () => {
                this.switchView('dashboard');
            });
        }

        const reviewMoreBtn = document.getElementById('review-more');
        if (reviewMoreBtn) {
            reviewMoreBtn.addEventListener('click', () => {
                this.startReviewSession();
            });
        }

        // Cancel add topic
        const cancelBtn = document.getElementById('cancel-add-topic');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.switchView('dashboard');
            });
        }

        // Modal events
        const closeEditModal = document.getElementById('close-edit-modal');
        if (closeEditModal) {
            closeEditModal.addEventListener('click', () => {
                this.closeEditModal();
            });
        }

        const cancelEditBtn = document.getElementById('cancel-edit-topic');
        if (cancelEditBtn) {
            cancelEditBtn.addEventListener('click', () => {
                this.closeEditModal();
            });
        }

        // Click outside modal to close
        const editModal = document.getElementById('edit-topic-modal');
        if (editModal) {
            editModal.addEventListener('click', (e) => {
                if (e.target === editModal) {
                    this.closeEditModal();
                }
            });
        }

        // Make functions available globally for onclick handlers
        window.deleteTopic = (topicId) => this.deleteTopic(topicId);
        window.editTopic = (topicId) => this.openEditModal(topicId);
    }

    // View Management
    switchView(viewName) {
        console.log(`Switching to view: ${viewName}`);

        // Update navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-view') === viewName) {
                btn.classList.add('active');
            }
        });

        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });

        // Show target view
        const targetView = document.getElementById(`${viewName}-view`);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewName;

            // Reset forms when switching to add topic view
            if (viewName === 'add-topic') {
                this.resetAddTopicForm();
                this.populateCategoryDropdowns();
            }
        }
    }

    // Category Management
    populateCategoryDropdowns() {
        const categorySelect = null; // removed primary select
        const editCategorySelect = null; // removed primary select (edit)
        const additionalCategoriesContainer = document.getElementById('topic-additional-categories');
        const editAdditionalCategoriesContainer = document.getElementById('edit-topic-additional-categories');
        const categoryFilter = document.getElementById('category-filter');

        // Sort categories alphabetically
        const sortedCategories = [...this.categories].sort();

        // Populate add topic dropdown
        // primary category dropdown removed

        // Populate edit topic dropdown
        // edit primary category dropdown removed

        // Helper to render checkboxes for additional categories
        const renderAdditionalCheckboxes = (container, nameAttr) => {
            if (!container) return;
            container.innerHTML = '';
            sortedCategories.forEach(category => {
                const id = `${nameAttr}-${category.replace(/\s+/g, '-').toLowerCase()}`;
                const wrapper = document.createElement('div');
                wrapper.className = 'checkbox-item';

                const input = document.createElement('input');
                input.type = 'checkbox';
                input.id = id;
                input.name = nameAttr;
                input.value = category;

                const label = document.createElement('label');
                label.setAttribute('for', id);
                label.textContent = category;

                wrapper.appendChild(input);
                wrapper.appendChild(label);
                container.appendChild(wrapper);
            });
        };

        // Populate additional categories (checkbox groups)
        renderAdditionalCheckboxes(additionalCategoriesContainer, 'additionalCategories');
        renderAdditionalCheckboxes(editAdditionalCategoriesContainer, 'additionalCategories');

        // After rendering, update subcategory dropdowns based on current selections
        this.updateSubcategoryFromSelected('add');
        this.updateSubcategoryFromSelected('edit');

        // Populate filter dropdown
        if (categoryFilter) {
            categoryFilter.innerHTML = '<option value="all">All Categories</option>';
            sortedCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

            // Restore selected filter
            categoryFilter.value = this.selectedCategoryFilter;
        }

        // Update sub-category filter after populating categories
        this.updateSubCategoryFilter();
    }

    updateSubCategoryFilter() {
        const subcategoryFilter = document.getElementById('subcategory-filter');
        if (!subcategoryFilter) return;

        if (this.selectedCategoryFilter === 'all') {
            subcategoryFilter.disabled = true;
            subcategoryFilter.innerHTML = '<option value="all">All Sub-Categories</option>';
            this.selectedSubCategoryFilter = 'all';
        } else {
            subcategoryFilter.disabled = false;
            subcategoryFilter.innerHTML = '<option value="all">All Sub-Categories</option>';

            const subcategories = this.subCategories[this.selectedCategoryFilter] || [];
            const sortedSubCategories = [...subcategories].sort();

            sortedSubCategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategoryFilter.appendChild(option);
            });

            // Reset to 'all' when category changes
            this.selectedSubCategoryFilter = 'all';
            subcategoryFilter.value = 'all';
        }
    }

    handleCategorySelection() { /* deprecated: primary category removed */ }

    // Helper: read selected checkbox categories by context
    getSelectedCategories(context) {
        const containerId = context === 'edit' ? 'edit-topic-additional-categories' : 'topic-additional-categories';
        return Array.from(document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)).map(cb => cb.value);
    }

    // Update subcategory dropdown based on selected categories
    updateSubcategoryFromSelected(context) {
        const selected = this.getSelectedCategories(context);
        const prefix = context === 'edit' ? 'edit-' : '';
        const subcategorySelect = document.getElementById(`${prefix}topic-subcategory`);
        if (!subcategorySelect) return;

        if (selected.length === 1) {
            // Populate subcategories for the single selected category
            const categoryValue = selected[0];
            subcategorySelect.disabled = false;
            subcategorySelect.innerHTML = '<option value="">Select a sub-category...</option>';
            const subcategories = this.subCategories[categoryValue] || [];
            const sortedSubCategories = [...subcategories].sort();
            sortedSubCategories.forEach(subcategory => {
                const option = document.createElement('option');
                option.value = subcategory;
                option.textContent = subcategory;
                subcategorySelect.appendChild(option);
            });

            const newSubCategoryOption = document.createElement('option');
            newSubCategoryOption.value = 'add-new';
            newSubCategoryOption.textContent = 'Add New Sub-Category...';
            newSubCategoryOption.style.fontStyle = 'italic';
            subcategorySelect.appendChild(newSubCategoryOption);
        } else {
            subcategorySelect.disabled = true;
            subcategorySelect.innerHTML = selected.length === 0
                ? '<option value="">Select a category first...</option>'
                : '<option value="">Select a single category to choose sub-category...</option>';
        }
    }

    populateSubCategoryDropdown(categoryValue, context) {
        const prefix = context === 'edit' ? 'edit-' : '';
        const subcategorySelect = document.getElementById(`${prefix}topic-subcategory`);

        if (!subcategorySelect) return;

        if (!categoryValue) {
            subcategorySelect.disabled = true;
            subcategorySelect.innerHTML = '<option value="">Select a category first...</option>';
            return;
        }

        subcategorySelect.disabled = false;
        subcategorySelect.innerHTML = '<option value="">Select a sub-category...</option>';

        const subcategories = this.subCategories[categoryValue] || [];
        const sortedSubCategories = [...subcategories].sort();

        sortedSubCategories.forEach(subcategory => {
            const option = document.createElement('option');
            option.value = subcategory;
            option.textContent = subcategory;
            subcategorySelect.appendChild(option);
        });

        // Add "Add New Sub-Category..." option at the end
        const newSubCategoryOption = document.createElement('option');
        newSubCategoryOption.value = 'add-new';
        newSubCategoryOption.textContent = 'Add New Sub-Category...';
        newSubCategoryOption.style.fontStyle = 'italic';
        subcategorySelect.appendChild(newSubCategoryOption);
    }

    handleSubCategorySelection(value, context) {
        const prefix = context === 'edit' ? 'edit-' : '';
        const newSubCategoryGroup = document.getElementById(`${prefix}new-subcategory-group`);
        const newSubCategoryInput = document.getElementById(`${prefix}new-subcategory-name`);

        if (value === 'add-new') {
            if (newSubCategoryGroup) {
                newSubCategoryGroup.style.display = 'block';
            }
            if (newSubCategoryInput) {
                newSubCategoryInput.setAttribute('required', 'required');
                setTimeout(() => newSubCategoryInput.focus(), 100);
            }
        } else {
            if (newSubCategoryGroup) {
                newSubCategoryGroup.style.display = 'none';
            }
            if (newSubCategoryInput) {
                newSubCategoryInput.removeAttribute('required');
                newSubCategoryInput.value = '';
            }
        }
    }

    clearCategoryErrors() {
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => {
            if (alert.textContent.includes('Category') || alert.textContent.includes('category')) {
                alert.remove();
            }
        });
    }

    addNewCategory(categoryName) {
        const trimmedName = categoryName.trim();

        if (!trimmedName) {
            this.showAlert('Category name cannot be empty.', 'error');
            return false;
        }

        // Check for duplicates (case-insensitive)
        const exists = this.categories.some(cat =>
            cat.toLowerCase() === trimmedName.toLowerCase()
        );

        if (exists) {
            this.showAlert('Category already exists.', 'error');
            return false;
        }

        // Add category and initialize empty sub-categories array
        this.categories.push(trimmedName);
        this.categories.sort(); // Keep categories sorted
        this.subCategories[trimmedName] = [];
        this.saveToCloud();
        this.populateCategoryDropdowns();

        this.showAlert(`Category "${trimmedName}" added successfully!`, 'success');
        return trimmedName;
    }

    addNewSubCategory(categoryName, subCategoryName) {
        const trimmedName = subCategoryName.trim();

        if (!trimmedName) {
            this.showAlert('Sub-category name cannot be empty.', 'error');
            return false;
        }

        if (!this.subCategories[categoryName]) {
            this.subCategories[categoryName] = [];
        }

        // Check for duplicates (case-insensitive)
        const exists = this.subCategories[categoryName].some(subCat =>
            subCat.toLowerCase() === trimmedName.toLowerCase()
        );

        if (exists) {
            this.showAlert('Sub-category already exists in this category.', 'error');
            return false;
        }

        // Add sub-category and sort
        this.subCategories[categoryName].push(trimmedName);
        this.subCategories[categoryName].sort();
        this.saveToCloud();

        this.showAlert(`Sub-category "${trimmedName}" added successfully!`, 'success');
        return trimmedName;
    }

    // Topic Management
    addTopic() {
        console.log('Adding topic...');

        const form = document.getElementById('add-topic-form');
        if (!form) {
            this.showAlert('Form not found.', 'error');
            return;
        }

        const formData = new FormData(form);

        const name = formData.get('name')?.trim() || '';
        const selectedSubCategory = formData.get('subcategory') || '';
        const newSubCategoryName = formData.get('newSubcategory')?.trim() || '';
        const description = formData.get('description')?.trim() || '';
        // Get additional categories selections (checkboxes)
        const additionalCategories = Array.from(document.querySelectorAll('#topic-additional-categories input[type="checkbox"]:checked')).map(cb => cb.value);

        // Validate topic name
        if (!name) {
            this.showAlert('Topic name is required.', 'error');
            return;
        }

        // Validate category selection (at least one checkbox)
        if (!additionalCategories || additionalCategories.length === 0) {
            this.showAlert('Please select at least one category.', 'error');
            return;
        }

        let finalSubCategory = selectedSubCategory;

        // Handle new sub-category creation (only when exactly one category selected)
        if (selectedSubCategory === 'add-new') {
            if (!newSubCategoryName) {
                this.showAlert('Please enter a sub-category name.', 'error');
                return;
            }

            const singleCategory = additionalCategories.length === 1 ? additionalCategories[0] : null;
            if (!singleCategory) {
                this.showAlert('Select exactly one category to add a sub-category for.', 'error');
                return;
            }

            const createdSubCategory = this.addNewSubCategory(singleCategory, newSubCategoryName);
            if (!createdSubCategory) {
                return; // Error was already shown in addNewSubCategory
            }
            finalSubCategory = createdSubCategory;
        }

        // Sub-category is optional now; ignore if empty
        if (!finalSubCategory || finalSubCategory === 'add-new') {
            finalSubCategory = '';
        }

        // Check for duplicate topic names (case-insensitive)
        const exists = this.topics.some(topic =>
            topic.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            this.showAlert('A topic with this name already exists.', 'error');
            return;
        }

        // Create new topic
        const categories = Array.from(new Set(additionalCategories));
        const newTopic = {
            id: Date.now().toString(),
            name: name,
            category: categories[0] || '', // keep first for backward compatibility
            categories: categories,
            subCategory: finalSubCategory,
            description: description,
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0,
            nextReviewDate: this.getCurrentDate(),
            dateAdded: this.getCurrentDate(),
            lastReviewedDate: ''
        };

        console.log('Created new topic:', newTopic);

        this.topics.push(newTopic);
        this.saveToCloud();

        this.showAlert('Topic added successfully!', 'success');
        this.resetAddTopicForm();
        this.updateDashboard();

        setTimeout(() => {
            this.switchView('dashboard');
        }, 1000);
    }

    resetAddTopicForm() {
        const form = document.getElementById('add-topic-form');
        if (form) {
            form.reset();
            this.updateSubcategoryFromSelected('add');
            this.handleSubCategorySelection('', 'add');
            // Clear additional categories checkboxes
            const addContainer = document.getElementById('topic-additional-categories');
            if (addContainer) {
                addContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            }
        }

        // Clear any alerts
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => {
            if (alert.textContent.includes('Category') || alert.textContent.includes('Topic')) {
                alert.remove();
            }
        });
    }

    openEditModal(topicId) {
        const topic = this.topics.find(t => t.id === topicId);
        if (!topic) {
            this.showAlert('Topic not found.', 'error');
            return;
        }

        this.editingTopicId = topicId;

        // Populate edit form
        document.getElementById('edit-topic-id').value = topic.id;
        document.getElementById('edit-topic-name').value = topic.name;
        document.getElementById('edit-topic-description').value = topic.description || '';

        // Populate categories and checkboxes
        this.populateCategoryDropdowns();

        // Set additional categories selections based on topic.categories
        const editAdditionalContainer = document.getElementById('edit-topic-additional-categories');
        if (editAdditionalContainer) {
            const allCats = topic.categories && Array.isArray(topic.categories)
                ? topic.categories
                : (topic.category ? [topic.category] : []);
            editAdditionalContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => {
                cb.checked = allCats.includes(cb.value);
            });
            // Update subcategory based on single-selection rule
            this.updateSubcategoryFromSelected('edit');
            setTimeout(() => {
                const editSub = document.getElementById('edit-topic-subcategory');
                if (editSub) editSub.value = topic.subCategory || '';
            }, 50);
        }

        // (primary vs additional no longer used; keep all checked as above)

        // Show modal
        const modal = document.getElementById('edit-topic-modal');
        if (modal) {
            modal.classList.remove('hidden');
        }
    }

    closeEditModal() {
        const modal = document.getElementById('edit-topic-modal');
        if (modal) {
            modal.classList.add('hidden');
        }

        this.editingTopicId = null;

        // Reset form
        const form = document.getElementById('edit-topic-form');
        if (form) {
            form.reset();
            this.updateSubcategoryFromSelected('edit');
            this.handleSubCategorySelection('', 'edit');
            // Clear additional categories checkboxes
            const editContainer = document.getElementById('edit-topic-additional-categories');
            if (editContainer) {
                editContainer.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            }
        }
    }

    updateTopic() {
        if (!this.editingTopicId) {
            this.showAlert('No topic is being edited.', 'error');
            return;
        }

        const form = document.getElementById('edit-topic-form');
        if (!form) {
            this.showAlert('Form not found.', 'error');
            return;
        }

        const formData = new FormData(form);

        const name = formData.get('name')?.trim() || '';
        const selectedSubCategory = formData.get('subcategory') || '';
        const newSubCategoryName = formData.get('newSubcategory')?.trim() || '';
        const description = formData.get('description')?.trim() || '';
        // Get additional categories selections (checkboxes)
        const additionalCategories = Array.from(document.querySelectorAll('#edit-topic-additional-categories input[type="checkbox"]:checked')).map(cb => cb.value);

        // Validate topic name
        if (!name) {
            this.showAlert('Topic name is required.', 'error');
            return;
        }

        // Validate category selection via checkboxes
        if (!additionalCategories || additionalCategories.length === 0) {
            this.showAlert('Please select at least one category.', 'error');
            return;
        }

        let finalSubCategory = selectedSubCategory;

        // Handle new sub-category creation (only when exactly one category selected)
        if (selectedSubCategory === 'add-new') {
            if (!newSubCategoryName) {
                this.showAlert('Please enter a sub-category name.', 'error');
                return;
            }

            const singleCategory = additionalCategories.length === 1 ? additionalCategories[0] : null;
            if (!singleCategory) {
                this.showAlert('Select exactly one category to add a sub-category for.', 'error');
                return;
            }

            const createdSubCategory = this.addNewSubCategory(singleCategory, newSubCategoryName);
            if (!createdSubCategory) {
                return;
            }
            finalSubCategory = createdSubCategory;
        }

        // Sub-category optional now
        if (!finalSubCategory || finalSubCategory === 'add-new') {
            finalSubCategory = '';
        }

        // Check for duplicate topic names (excluding current topic)
        const exists = this.topics.some(topic =>
            topic.id !== this.editingTopicId &&
            topic.name.toLowerCase() === name.toLowerCase()
        );

        if (exists) {
            this.showAlert('A topic with this name already exists.', 'error');
            return;
        }

        // Update topic
        const topicIndex = this.topics.findIndex(t => t.id === this.editingTopicId);
        if (topicIndex !== -1) {
            const categories = Array.from(new Set(additionalCategories));
            this.topics[topicIndex] = {
                ...this.topics[topicIndex],
                name: name,
                category: categories[0] || '',
                categories: categories,
                subCategory: finalSubCategory,
                description: description
            };

            this.saveToCloud();
            this.showAlert('Topic updated successfully!', 'success');
            this.closeEditModal();
            this.updateDashboard();
        } else {
            this.showAlert('Topic not found.', 'error');
        }
    }

    deleteTopic(topicId) {
        if (confirm('Are you sure you want to delete this topic?')) {
            this.topics = this.topics.filter(topic => topic.id !== topicId);
            this.saveToCloud();
            this.updateDashboard();
            this.showAlert('Topic deleted successfully!', 'success');
        }
    }

    // Dashboard Management
    updateDashboard() {
        const filteredTopics = this.getFilteredTopics();
        const dueTopics = this.getDueItems(filteredTopics);

        // Update stats
        const totalTopicsEl = document.getElementById('total-topics');
        const dueTopicsEl = document.getElementById('due-topics');
        const completedTodayEl = document.getElementById('completed-today');

        if (totalTopicsEl) totalTopicsEl.textContent = filteredTopics.length;
        if (dueTopicsEl) dueTopicsEl.textContent = dueTopics.length;
        if (completedTodayEl) completedTodayEl.textContent = this.getCompletedToday();

        // Update review button
        const reviewBtn = document.getElementById('start-review-btn');
        if (reviewBtn) {
            let categoryText = this.selectedCategoryFilter === 'all' ? 'All Categories' : this.selectedCategoryFilter;
            if (this.selectedCategoryFilter !== 'all' && this.selectedSubCategoryFilter !== 'all') {
                categoryText += ` > ${this.selectedSubCategoryFilter}`;
            }
            reviewBtn.textContent = `Start Review Session - ${categoryText} (${dueTopics.length} items)`;
            reviewBtn.disabled = dueTopics.length === 0;
        }

        // Update topics list
        this.renderTopicsList(filteredTopics);
    }

    getFilteredTopics() {
        let filtered = this.topics;

        if (this.selectedCategoryFilter !== 'all') {
            filtered = filtered.filter(topic => {
                if (Array.isArray(topic.categories)) {
                    return topic.categories.includes(this.selectedCategoryFilter);
                }
                return topic.category === this.selectedCategoryFilter;
            });
        }

        if (this.selectedSubCategoryFilter !== 'all') {
            filtered = filtered.filter(topic => topic.subCategory === this.selectedSubCategoryFilter);
        }

        return filtered;
    }

    renderTopicsList(topics) {
        const container = document.getElementById('topics-list');
        if (!container) return;

        if (topics.length === 0) {
            let emptyMessage = 'No topics found. Add your first topic to get started with spaced repetition learning.';
            if (this.selectedCategoryFilter !== 'all') {
                emptyMessage = `No topics found in "${this.selectedCategoryFilter}"`;
                if (this.selectedSubCategoryFilter !== 'all') {
                    emptyMessage += ` > "${this.selectedSubCategoryFilter}"`;
                }
                emptyMessage += '.';
            }

            container.innerHTML = `
                <div class="empty-state">
                    <h3>No topics found</h3>
                    <p>${emptyMessage}</p>
                </div>
            `;
            return;
        }

        container.innerHTML = topics.map(topic => {
            const dueStatus = this.getDueStatus(topic);
            const categories = Array.isArray(topic.categories) && topic.categories.length > 0
                ? topic.categories
                : (topic.category ? [topic.category] : []);
            const categoriesHtml = categories.map(c => `<span class="status status--info">${this.escapeHtml(c)}</span>`).join(' ');
            return `
                <div class="topic-item">
                    <div class="topic-header">
                        <h4 class="topic-name">${this.escapeHtml(topic.name)}</h4>
                        <div class="topic-actions">
                            <button class="btn btn--outline btn--sm" onclick="editTopic('${topic.id}')">Edit</button>
                            <button class="btn btn--outline btn--sm" onclick="deleteTopic('${topic.id}')">Delete</button>
                        </div>
                    </div>
                    <div class="topic-category">
                        ${categoriesHtml}
                        <span class="status status--success">${this.escapeHtml(topic.subCategory || 'No Sub-Category')}</span>
                    </div>
                    <p class="topic-description">${this.escapeHtml(topic.description || 'No description provided.')}</p>
                    <div class="topic-meta">
                        <span>Added: ${this.formatDate(topic.dateAdded)}</span>
                        <span class="topic-due-status ${dueStatus.class}">${dueStatus.text}</span>
                    </div>
                </div>
            `;
        }).join('');
    }

    getDueStatus(topic) {
        const today = this.getCurrentDate();
        const nextReview = topic.nextReviewDate;

        if (nextReview < today) {
            return { class: 'overdue', text: 'Overdue' };
        } else if (nextReview === today) {
            return { class: 'due-today', text: 'Due Today' };
        } else {
            return { class: 'future', text: `Due ${this.formatDate(nextReview)}` };
        }
    }

    // Review Session Management
    startReviewSession() {
        const filteredTopics = this.getFilteredTopics();
        const dueItems = this.getDueItems(filteredTopics);

        if (dueItems.length === 0) {
            this.showAlert('No topics are due for review right now!', 'info');
            return;
        }

        this.reviewSession = {
            items: [...dueItems],
            currentIndex: 0,
            completed: [],
            startTime: Date.now()
        };

        this.switchView('review');
        this.updateReviewInterface();
    }

    getDueItems(topics = null) {
        const topicsToCheck = topics || this.topics;
        const today = this.getCurrentDate();
        return topicsToCheck.filter(topic => topic.nextReviewDate <= today);
    }

    updateReviewInterface() {
        if (!this.reviewSession || this.reviewSession.currentIndex >= this.reviewSession.items.length) {
            this.completeReviewSession();
            return;
        }

        const currentTopic = this.reviewSession.items[this.reviewSession.currentIndex];
        const progress = ((this.reviewSession.currentIndex) / this.reviewSession.items.length) * 100;

        // Update progress
        const progressText = document.getElementById('review-progress-text');
        const progressFill = document.getElementById('progress-fill');

        if (progressText) {
            progressText.textContent = `Question ${this.reviewSession.currentIndex + 1} of ${this.reviewSession.items.length}`;
        }
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }

        // Update topic info
        const categoryEl = document.getElementById('current-topic-category');
        const subcategoryEl = document.getElementById('current-topic-subcategory');
        const nameEl = document.getElementById('current-topic-name');
        const descEl = document.getElementById('current-topic-description');

        if (categoryEl) {
            const cats = Array.isArray(currentTopic.categories) && currentTopic.categories.length > 0
                ? currentTopic.categories.join(', ')
                : (currentTopic.category || '');
            categoryEl.textContent = cats;
        }
        if (subcategoryEl) subcategoryEl.textContent = currentTopic.subCategory || 'No Sub-Category';
        if (nameEl) nameEl.textContent = currentTopic.name;
        if (descEl) descEl.textContent = currentTopic.description || 'No description provided.';

        // Populate and sync the question picker
        const questionPicker = document.getElementById('question-picker');
        if (questionPicker) {
            const completedIds = new Set(this.reviewSession.completed.map(c => c.topic.id));
            // Build options list: only remaining items are enabled; completed are shown but disabled
            questionPicker.innerHTML = '';
            const placeholder = document.createElement('option');
            placeholder.value = '';
            placeholder.textContent = 'Pick question...';
            placeholder.disabled = true;
            questionPicker.appendChild(placeholder);

            this.reviewSession.items.forEach((item, idx) => {
                const opt = document.createElement('option');
                opt.value = item.id;
                const isCompleted = completedIds.has(item.id);
                const labelIdx = idx + 1;
                // Trim overly long names for compactness
                const name = item.name && item.name.length > 60 ? item.name.slice(0, 57) + '…' : (item.name || 'Untitled');
                opt.textContent = `${labelIdx}. ${name}`;
                opt.disabled = isCompleted;
                questionPicker.appendChild(opt);
            });

            questionPicker.disabled = false;
            questionPicker.value = currentTopic.id;
        }
    }

    answerReview(difficulty) {
        if (!this.reviewSession) return;

        const currentTopic = this.reviewSession.items[this.reviewSession.currentIndex];
        const updatedTopic = this.updateTopicWithSM2(currentTopic, difficulty);

        // Update the topic in main topics array
        const topicIndex = this.topics.findIndex(t => t.id === updatedTopic.id);
        if (topicIndex !== -1) {
            this.topics[topicIndex] = updatedTopic;
        }

        this.reviewSession.completed.push({
            topic: updatedTopic,
            difficulty: difficulty
        });

        this.reviewSession.currentIndex++;
        this.updateReviewInterface();
        this.saveToCloud();
    }

    // SM-2 Spaced Repetition Algorithm
    updateTopicWithSM2(topic, quality) {
        const newTopic = { ...topic };

        if (quality >= 3) {
            if (newTopic.repetitions === 0) {
                newTopic.interval = 1;
            } else if (newTopic.repetitions === 1) {
                newTopic.interval = 6;
            } else {
                newTopic.interval = Math.round(newTopic.interval * newTopic.easeFactor);
            }
            newTopic.repetitions++;
        } else {
            newTopic.repetitions = 0;
            newTopic.interval = 1;
        }

        newTopic.easeFactor = Math.max(1.3,
            newTopic.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        );

        const todayStr = this.getCurrentDate();
        newTopic.nextReviewDate = this.addDaysToDate(todayStr, newTopic.interval);
        newTopic.lastReviewedDate = todayStr;

        return newTopic;
    }

    completeReviewSession() {
        if (!this.reviewSession) return;

        const completedCount = this.reviewSession.completed.length;
        const averageDifficulty = completedCount > 0 ?
            (this.reviewSession.completed.reduce((sum, item) => sum + item.difficulty, 0) / completedCount).toFixed(1) :
            '-';

        const topicsReviewedEl = document.getElementById('topics-reviewed');
        const avgDifficultyEl = document.getElementById('average-difficulty');

        if (topicsReviewedEl) topicsReviewedEl.textContent = completedCount;
        if (avgDifficultyEl) avgDifficultyEl.textContent = averageDifficulty;

        this.reviewSession = null;
        this.updateDashboard();
        this.switchView('review-complete');
    }

    endReviewSession() {
        if (confirm('Are you sure you want to end the review session? Your progress will be saved.')) {
            this.completeReviewSession();
        }
    }

    // Utility Functions
    getCurrentDate() {
        // Local, timezone-safe YYYY-MM-DD (avoids UTC off-by-one issues)
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${y}-${m}-${day}`;
    }

    addDaysToDate(dateString, days) {
        // Interprets the input as a local date and adds days locally
        const [y, m, d] = dateString.split('-').map(Number);
        const date = new Date(y, (m || 1) - 1, d || 1);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + days);
        const yy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        return `${yy}-${mm}-${dd}`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    getCompletedToday() {
        const today = this.getCurrentDate();
        return this.topics.filter(topic => topic.lastReviewedDate === today).length;
    }

    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showAlert(message, type = 'info') {
        // Remove existing alerts of the same type
        const existingAlerts = document.querySelectorAll('.alert');
        existingAlerts.forEach(alert => {
            if (alert.classList.contains(`alert--${type}`)) {
                alert.remove();
            }
        });

        const alert = document.createElement('div');
        alert.className = `alert alert--${type}`;
        alert.textContent = message;

        const container = document.querySelector('.container');
        const header = container.querySelector('.header');
        if (header) {
            container.insertBefore(alert, header.nextSibling);
        } else {
            container.insertBefore(alert, container.firstChild);
        }

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new DSASpacedRepetitionTool();
});
