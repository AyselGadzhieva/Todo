<template>
  <Page>
    <ActionBar title="Список задач" />
    <TabView height="100%" android-tabs-position="bottom"
             selected-tab-text-color="RosyBrown" tab-text-font-size="15">
      <TabViewItem title="Задачи" text-transform="uppercase">
        <FlexboxLayout flexDirection="column"
                       justifyContent="space-between">
          <ScrollView v-if="tasks.length > 0" orientation="horizontal" width="100%">
            <ListView for="task in tasks"
                      width="100%">
              <v-template>
                <FlexboxLayout flexDirection="row"
                               justifyContent="space-between">
                  <FlexboxLayout flexDirection="row">
                    <Image
                        src="~/assets/images/undone_icon.png"
                        stretch="None" alignSelf="center"
                        style="margin-left: 40px; margin-right: 40px"
                        @tap="doneTask(task)" />
                    <FlexboxLayout @tap="itemEdit(task)"
                                   flexDirection="column">
                      <Label :text="task.name"
                             style="font-size:18px" />
                      <Label :text="task.text" />
                      <Label :text="task.created"
                             style="color: RosyBrown" />
                    </FlexboxLayout>
                  </FlexboxLayout>
                  <Image
                      src="~/assets/images/delete_garbage_icon.png"
                      stretch="None" alignSelf="center"
                      style="margin-right: 40px"
                      @tap="itemDelete(task)" />
                </FlexboxLayout>
              </v-template>
            </ListView>
          </ScrollView>
          <Label v-else class="no-task"
                 text="Нет запланированных задач" />
          <Button class="btn" text="+" @tap="addTask" />
        </FlexboxLayout>
      </TabViewItem>

      <TabViewItem title="Выполненные задачи" text-transform="uppercase">
        <FlexboxLayout flexDirection="column"
                       justifyContent="space-between">
          <ScrollView v-if="tasks_done.length > 0" orientation="horizontal" width="100%">
            <ListView for="task in tasks_done" width="100%">
              <v-template>
                <FlexboxLayout flexDirection="row"
                               justifyContent="space-between">
                  <FlexboxLayout flexDirection="row">
                    <Image
                        src="~/assets/images/done_icon.png"
                        stretch="None" alignSelf="center"
                        style="margin-left: 40px; margin-right: 40px"
                        @tap="doneTask(task)" />
                    <FlexboxLayout flexDirection="column">
                      <Label :text="task.name"
                             style="font-size:18px" />
                      <Label :text="task.text" />
                      <Label :text="task.created"
                             style="color: RosyBrown" />
                    </FlexboxLayout>
                  </FlexboxLayout>
                  <Image
                      src="~/assets/images/delete_garbage_icon.png"
                      stretch="None" alignSelf="center"
                      style="margin-right: 40px"
                      @tap="itemDelete(task)" />
                </FlexboxLayout>
              </v-template>
            </ListView>
          </ScrollView>
          <Label v-else class="no-task" text="Нет выполненных задач" />
        </FlexboxLayout>
      </TabViewItem>
    </TabView>
  </Page>
</template>

<script>
import { getTasks, setTask } from "@/store.js";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
export default {
  components: {
    AddTask,
    EditTask
  },
  created() {
    this.tasks = getTasks("tasks");
    this.tasks_done = getTasks("tasks_done");
  },
  methods: {
    setValues() {
      setTask("tasks", this.tasks);
      setTask("tasks_done", this.tasks_done);
    },
    addTask() {
      this.$showModal(AddTask).then(data => {
        data = JSON.parse(JSON.stringify(data));
        data["id"] =
            "id" +
            Math.random()
                .toString(16)
                .slice(2);
        this.tasks.push(data);
        this.setValues();
      });
    },
    itemEdit(task) {
      this.$showModal(EditTask, {
        props: {
          task
        }
      }).then(data => {
        let index = this.tasks.findIndex(t => t.id ===
            data.id);
        this.tasks[index].name = data.name;
        this.tasks[index].text = data.text;
        this.setValues();
      });
    },
    itemDelete(task) {
      if (!task.done) {
        let index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks.splice(index, 1);
      } else {
        let index = this.tasks_done.findIndex(t => t.id === task
            .id);
        this.tasks_done.splice(index, 1);
      }
      this.setValues();
    },
    doneTask(task) {
      if (!task.done) {
        let index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index].done = true;
        this.tasks_done.push(this.tasks[index]);
        this.tasks.splice(index, 1);
      } else {
        let index = this.tasks_done.findIndex(t => t.id === task
            .id);
        this.tasks_done[index].done = false;
        this.tasks.push(this.tasks_done[index]);
        this.tasks_done.splice(index, 1);
      }
      this.setValues();
    }
  },

  data() {
    return {
      tasks: [],
      tasks_done: []
    };
  }
};
</script>

<style scoped>
ActionBar {
  background-color: SlateBlue;
  color: white;
}

.btn {
  min-height: 160px;
  background-color: SlateBlue;
  color: white;
  border-radius: 100;
  margin-bottom: 40px;
  font-size: 32px;
}

.no-task {
  font-size: 24px;
  text-align: center;
  margin-top: 60px;
}
</style>