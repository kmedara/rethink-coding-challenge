
##### from solution folder
```
$ docker build -t medara/patients -f Rethink.Patient-Api.Api/Dockerfile .
```

##### Pod deployment 
###### https://github.com/stacksimplify/azure-aks-kubernetes-masterclass/tree/master/03-Kubernetes-Fundamentals-with-kubectl/03-01-PODs-with-kubectl
```
$ kubectl run <<pod name>>  --image <<image name>> --image-pull-policy=Never
```
##### Expose Pod as service
kubectl expose pod <Pod-Name>  --type=LoadBalancer --port=80 --name=<Service-Name>

# Get Service Info
kubectl get service
kubectl get svc

# Describe Service
kubectl describe service my-first-service

# Access Application
http://<External-IP-from-get-service-output>


#### Ingress Controllers 
With the Ingress Controller you can setup a domain name which maps to your pod; you don't need to give your Service the LoadBalancer type if you use an Ingress Controller.

#### Services, Ingress, and minikube
https://minikube.sigs.k8s.io/docs/handbook/accessing/
https://kubernetes.io/docs/tasks/access-application-cluster/ingress-minikube/
https://stackoverflow.com/questions/44110876/kubernetes-service-external-ip-pending