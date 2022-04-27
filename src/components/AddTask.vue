<template>
    <Page>
        <FlexboxLayout flexDirection="column">
            <Label class="add-task-title" text="Добавить задачу" />
            <TaskForm :task='task' @saveTask='addTask' />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import TaskForm from "./TaskForm";
    export default {
        components: {
            TaskForm
        },
        data() {
            return {
                task: {
                    name: "",
                    text: ""
                }
            };
        },
        methods: {
            addTask(data) {
                let created = new Date().toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                });
                let task = {
                    name: data.name,
                    text: data.text,
                    created: created,
                    done: false
                };
                this.$modal.close(task);
            }
        }
    };
</script>

<style scoped>
    .add-task-title {
        font-size: 18px;
        margin: 60px 0px 60px 60px;
    }
</style>