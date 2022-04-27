<template>
    <Page>
        <FlexboxLayout flexDirection="column">
            <Label class="add-task-title" text="Изменить задачу" />
            <TaskForm :task='task' @saveTask='editTask' />
        </FlexboxLayout>
    </Page>
</template>

<script>
    import TaskForm from "./TaskForm";
    export default {
        components: {
            TaskForm
        },
        props: ["task"],
        methods: {
            editTask(data) {
                this.$modal.close({id: this.task.id, name: data.name, text: data.text});
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