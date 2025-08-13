import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { AlertCircleIcon, CheckIcon, PlusIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

// Sample security questions
const securityQuestionOptions = [
    "What was the name of your first pet?",
    "What was your childhood nickname?",
    "In what city were you born?",
    "What is the name of your favorite childhood teacher?",
    "What is your mother's maiden name?",
    "What was the make of your first car?",
    "What was the first concert you attended?",
    "What is the name of the street you grew up on?",
    "What is your favorite book?",
    "What is the name of your favorite childhood friend?",
  ];

const SecurityQuestions = () => {
    const [questions, setQuestions] = useState([
        { id: 1, question: securityQuestionOptions[0], answer: "", isEditing: false },
        { id: 2, question: securityQuestionOptions[2], answer: "", isEditing: false },
      ])
      const [isLoading, setIsLoading] = useState(false)
    
      const handleAddQuestion = () => {
        // Find an unused question
        const usedQuestions = questions.map((q) => q.question)
        const availableQuestion = securityQuestionOptions.find((q) => !usedQuestions.includes(q))
    
        if (availableQuestion) {
          setQuestions([
            ...questions,
            {
              id: Math.max(0, ...questions.map((q) => q.id)) + 1,
              question: availableQuestion,
              answer: "",
              isEditing: true,
            },
          ])
        } else {
          toast("Maximum questions reached. You've used all available security questions.")
        }
      }
    
      const handleRemoveQuestion = (id) => {
        setQuestions(questions.filter((q) => q.id !== id))
      }
    
      const handleQuestionChange = (id, question) => {
        setQuestions(questions.map((q) => (q.id === id ? { ...q, question } : q)))
      }
    
      const handleAnswerChange = (id, answer) => {
        setQuestions(questions.map((q) => (q.id === id ? { ...q, answer } : q)))
      }
    
      const handleToggleEdit = (id) => {
        setQuestions(questions.map((q) => (q.id === id ? { ...q, isEditing: !q.isEditing } : q)))
      }
    
      const handleSaveAll = () => {
        // Validate all questions have answers
        const unansweredQuestions = questions.filter((q) => !q.answer.trim())
    
        if (unansweredQuestions.length > 0) {
          toast({
            title: "Missing answers",
            description: "Please provide answers for all security questions.",
            variant: "destructive",
          })
          return
        }
    
        setIsLoading(true)
    
        // Simulate API call
        setTimeout(() => {
          setQuestions(questions.map((q) => ({ ...q, isEditing: false })))
          setIsLoading(false)
          toast({
            title: "Security questions saved",
            description: "Your security questions have been updated successfully.",
          })
        }, 1500)
      }
    
      const getAvailableQuestions = (currentQuestion) => {
        const usedQuestions = questions.map((q) => q.question)
        return [
          currentQuestion,
          ...securityQuestionOptions.filter((q) => !usedQuestions.includes(q) || q === currentQuestion),
        ]
      }
    return (
        <>
        <Card>
        <CardHeader>
            <CardTitle>Security Questions</CardTitle>
            <CardDescription>
            Set up security questions to help verify your identity if you forget your password.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {questions.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center">
                <h3 className="font-medium">No security questions set up</h3>
                <p className="text-sm text-muted-foreground mt-1">Add security questions to help protect your account.</p>
                <Button onClick={handleAddQuestion} className="mt-4">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Security Question
                </Button>
            </div>
            ) : (
            <>
                <div className="space-y-4">
                {questions.map((q) => (
                    <div key={q.id} className="rounded-lg border p-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor={`question-${q.id}`}>Security Question</Label>
                        {q.isEditing ? (
                            <Select value={q.question} onValueChange={(value) => handleQuestionChange(q.id, value)}>
                            <SelectTrigger id={`question-${q.id}`}>
                                <SelectValue placeholder="Select a security question" />
                            </SelectTrigger>
                            <SelectContent>
                                {getAvailableQuestions(q.question).map((question) => (
                                <SelectItem key={question} value={question}>
                                    {question}
                                </SelectItem>
                                ))}
                            </SelectContent>
                            </Select>
                        ) : (
                            <div className="rounded-md border px-3 py-2 text-sm">{q.question}</div>
                        )}
                        </div>

                        <div className="space-y-2">
                        <Label htmlFor={`answer-${q.id}`}>Answer</Label>
                        {q.isEditing ? (
                            <Input
                            id={`answer-${q.id}`}
                            value={q.answer}
                            onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                            placeholder="Enter your answer"
                            />
                        ) : (
                            <div className="rounded-md border px-3 py-2 text-sm">
                            {q.answer ? "••••••••••••" : "No answer provided"}
                            </div>
                        )}
                        </div>

                        <div className="flex justify-end gap-2">
                        {q.isEditing ? (
                            <Button size="sm" variant="outline" onClick={() => handleToggleEdit(q.id)}>
                            <CheckIcon className="h-4 w-4 mr-2" />
                            Done
                            </Button>
                        ) : (
                            <Button size="sm" variant="outline" onClick={() => handleToggleEdit(q.id)}>
                            Edit
                            </Button>
                        )}

                        <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive"
                            onClick={() => handleRemoveQuestion(q.id)}
                        >
                            <TrashIcon className="h-4 w-4 mr-2" />
                            Remove
                        </Button>
                        </div>
                    </div>
                    </div>
                ))}
                </div>

                {questions.length < 3 && (
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAddQuestion}
                    disabled={questions.length >= securityQuestionOptions.length}
                >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Another Question
                </Button>
                )}

                <div className="rounded-lg border p-3 bg-muted flex gap-3">
                <AlertCircleIcon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm">
                    Security questions are used to verify your identity if you forget your password or need to reset it.
                    Make sure your answers are memorable to you but difficult for others to guess.
                    </p>
                </div>
                </div>
            </>
            )}
        </CardContent>
        <CardFooter>
            <Button onClick={handleSaveAll} disabled={isLoading || questions.length === 0} className="ml-auto">
            {isLoading ? "Saving..." : "Save All Changes"}
            </Button>
        </CardFooter>
        </Card>
        </>
    );
};

export default SecurityQuestions;